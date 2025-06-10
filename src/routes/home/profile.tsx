import { createFileRoute, redirect } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { FaCode } from 'react-icons/fa';
import { IoFemale, IoMale } from 'react-icons/io5';
import { PiGraduationCapFill } from 'react-icons/pi';
import { RiEditFill } from 'react-icons/ri';
import defaultAvatar from '../../assets/logo.png';
import ncu from '../../assets/ncu.png';
import defaultBackground from '../../assets/squirrel.jpg';
import UserController from '../../backend/user/Controllers/UserController';
import { AuthGuard } from '../../utils/auth';
import getCroppedImg from '../../utils/cropImage';
import { supabase } from '../../utils/supabase';

export const Route = createFileRoute('/home/profile')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const userController = new UserController();
        const user = await userController.getCurrentUser();
        if (!user) {
            throw redirect({ to: '/' });
        }
        return { user };
    },
    component: ProfilePage,
})

function ProfilePage() {
    const profile = Route.useLoaderData().user;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBgModal, setShowBgModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [isUploadingBg, setIsUploadingBg] = useState(false);

    // 所有欄位顯示
    const userFields = [
        { label: "Email", value: profile.email },
        { label: "系所", value: profile.department },
        { label: "年級", value: profile.grade },
        { label: "電話", value: profile.phone },
    ];

    const now = new Date();
    const gradTime = profile.grad_time ? new Date(profile.grad_time) : null;
    const identityLabel =
        gradTime == null
            ? "開發團隊"
            : gradTime > now
                ? "學生"
                : "校友";

    // 編輯欄位
    const [editData, setEditData] = useState({
        username: profile.username ?? "",
        phone: profile.phone ?? "",
        bio: profile.bio ?? "",
        grade: profile.grade ?? 1,
    });

    // 預覽用
    const [avatarPreview, setAvatarPreview] = useState(profile.avatar ?? defaultAvatar);
    const [bgPreview, setBgPreview] = useState(profile.profileBackground ?? defaultBackground);

    // 上傳檔案 input ref
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bgInputRef = useRef<HTMLInputElement>(null);

    // --- 裁切相關 ---
    // 頭像
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    // 背景照
    const [bgCrop, setBgCrop] = useState({ x: 0, y: 0 });
    const [bgZoom, setBgZoom] = useState(1);
    const [bgCroppedAreaPixels, setBgCroppedAreaPixels] = useState<Area | null>(null);
    const [bgFile, setBgFile] = useState<File | null>(null);

    // 處理圖片預覽與裁切
    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg') => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'avatar') {
                setAvatarPreview(reader.result as string);
                setAvatarFile(file);
            } else {
                setBgPreview(reader.result as string);
                setBgFile(file);
            }
        };
        reader.readAsDataURL(file);
    };

    // 當裁切完成時取得裁切區域
    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    const onBgCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setBgCroppedAreaPixels(croppedAreaPixels);
    };

    // 儲存一般資料編輯
    const handleSave = async () => {
        setIsUploading(true);
        const userController = new UserController();
        const updateObj: Partial<{
            username: string;
            phone: string;
            bio: string;
            grade: number;
        }> = {};

        if (editData.username !== profile.username) updateObj.username = editData.username;
        if (editData.phone !== profile.phone) updateObj.phone = editData.phone;
        if (editData.bio !== profile.bio) updateObj.bio = editData.bio;
        if (editData.grade !== profile.grade) updateObj.grade = editData.grade;

        if (Object.keys(updateObj).length === 0) {
            setShowEditModal(false);
            setIsUploading(false);
            return;
        }

        await userController.updateUser(profile.id, updateObj);
        setShowEditModal(false);
        setIsUploading(false);
        window.location.reload();
    };

    // 儲存頭像（裁切後）
    const handleSaveAvatar = async () => {
        if (!avatarFile || !croppedAreaPixels) return;
        setIsUploadingAvatar(true);
        try {
            const croppedBlob = await getCroppedImg(avatarPreview, croppedAreaPixels);
            const croppedFile = new File([croppedBlob], avatarFile.name, { type: avatarFile.type });
            const fileExt = croppedFile.name.split('.').pop();
            const filePath = `${profile.id}/avatar_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

            const { data, error: uploadError } = await supabase.storage
                .from('avatar')
                .upload(filePath, croppedFile, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('avatar')
                .getPublicUrl(data.path);

            if (!publicUrlData || !publicUrlData.publicUrl) {
                throw new Error('無法取得頭像公開網址');
            }

            const userController = new UserController();
            await userController.updateUser(profile.id, { avatar: publicUrlData.publicUrl });
            setShowAvatarModal(false);
            window.location.reload();
        } catch (err) {
            alert('頭像上傳失敗');
        }
        setIsUploadingAvatar(false);
    };

    // 儲存背景照（裁切後）
    const handleSaveBg = async () => {
        if (!bgFile || !bgCroppedAreaPixels) return;
        setIsUploadingBg(true);
        try {
            const croppedBlob = await getCroppedImg(bgPreview, bgCroppedAreaPixels);
            const croppedFile = new File([croppedBlob], bgFile.name, { type: bgFile.type });
            const fileExt = croppedFile.name.split('.').pop();
            const filePath = `${profile.id}/bg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

            const { data, error: uploadError } = await supabase.storage
                .from('avatar')
                .upload(filePath, croppedFile, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from('avatar')
                .getPublicUrl(data.path);
            
            if (!publicUrlData || !publicUrlData.publicUrl) {
                throw new Error('無法取得背景照公開網址');
            }
            else{
              console.log(publicUrlData.publicUrl);
            }
          
            const userController = new UserController();
            await userController.updateUser(profile.id, { profileBackground: publicUrlData.publicUrl });
            setShowBgModal(false);
            // window.location.reload();
        } catch (err) {
            alert('背景照上傳失敗');
        }
        setIsUploadingBg(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto shadow-xl/30 rounded-2xl p-4 sm:p-6 lg:p-8">
            {/* Profile Background */}
            <div className="relative h-48 bg-gray-200 rounded-xl group">
                <img
                    src={bgPreview}
                    alt="Profile Background"
                    className="object-cover w-full h-full rounded-xl cursor-pointer hover:opacity-80"
                    onClick={() => setShowBgModal(true)}
                />
                <div className="absolute -bottom-12 right-6">
                    <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-4 border-white object-cover cursor-pointer bg-white"
                        onClick={() => setShowAvatarModal(true)}
                    />
                </div>
            </div>

            {/* Info Section */}
            <div className="pt-16 px-6 pb-6">
                <div className="flex justify-between items-center">
                    <div className='flex flex-row items-center gap-1'>
                        <h2 className="text-2xl font-bold text-black">{profile.name}</h2>
                        {/* 開發團隊 */}
                        {identityLabel == '開發團隊' && (
                            <div className='flex flex-row items-center gap-1'>
                                <FaCode className="text-yellow-500" title='NCUAPP開發團隊' />
                                <img src={ncu} alt='NCU' className='w-4' title='學校認證' />
                            </div>
                        )}
                        {/* 學生 */}
                        {identityLabel == '學生' && (
                            <div className='flex flex-row items-center gap-1'>
                                <img src={ncu} alt='NCU' className='w-4' title='學校認證' />
                                {profile.gender === '男' ? (
                                    <IoMale className="text-blue-500" />
                                ) : null}
                                {profile.gender === '女' ? (
                                    <IoFemale className="text-pink-500" />
                                ) : null
                                }
                            </div>
                        )}

                        {/* 校友 */}
                        {identityLabel == '校友' && (
                            <div className='flex flex-row items-center gap-1'>
                                <img src={ncu} alt='NCU' className='w-4' title='學校認證' />
                                <PiGraduationCapFill className="text-blue-900" title='校友' />
                                {profile.gender === '男' ? (
                                    <IoMale className="text-blue-500" title='生理男' />
                                ) : null}
                                {profile.gender === '女' ? (
                                    <IoFemale className="text-pink-500" title='生理女' />
                                ) : null
                                }
                            </div>
                        )}


                    </div>
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="text-blue-600 hover:underline"
                    >
                        <RiEditFill className="inline-block mr-1" />
                    </button>
                </div>
                <p className="text-gray-500">@{profile.username}</p>

                <div className="mt-4 space-y-2 bg-sky-50 shadow-md rounded-lg p-4">
                    {userFields.map((f, i) => (
                        <div key={i} className='space-x-2'>
                            <span className="font-semibold text-gray-700">{f.label}</span>
                            <span className="text-sm text-gray-800 break-all">{f.value ?? "無"}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 space-y-2 bg-sky-50 shadow-md rounded-lg p-4">
                    {profile.bio && (
                        <div className="space-x-2">
                            <span className="font-semibold text-gray-700">自我介紹</span>
                            <span className="text-gray-400 break-all">{profile.bio}</span>
                        </div>
                    )}

                </div>

                <div className="text-gray-400 text-sm mt-2">
                    <div className='text-xs'>※ 信箱、性別、系所不開放編輯，如需更動請聯絡NCU APP開發團隊。</div>
                    <div className='justify-self-end'>加入時間 {profile.joinedAt.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
                </div>
            </div>

            {/* 編輯 Modal */}
            {showEditModal && (
                <dialog open className="modal">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <h3 className="font-bold text-lg text-yellow-600 mb-4">編輯個人檔案</h3>
                        <form className="flex flex-col gap-2"
                            onSubmit={e => {
                                e.preventDefault();
                                handleSave();
                            }}>
                            <label className="font-bold">帳號 (username)</label>
                            <input
                                name="username"
                                value={editData.username}
                                onChange={e => setEditData(d => ({ ...d, username: e.target.value }))}
                                className="input input-bordered w-full"
                                required
                            />
                            <label className="font-bold">電話</label>
                            <input
                                name="phone"
                                value={editData.phone}
                                onChange={e => setEditData(d => ({ ...d, phone: e.target.value }))}
                                className="input input-bordered w-full"
                            />
                            <label className="font-bold">年級</label>
                            <input
                                name="grade"
                                type="number"
                                min={1}
                                value={editData.grade}
                                onChange={e => setEditData(d => ({ ...d, grade: Number(e.target.value) }))}
                                className="input input-bordered w-full"
                            />
                            <label className="font-bold">自我介紹</label>
                            <textarea
                                name="bio"
                                value={editData.bio}
                                onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))}
                                className="textarea textarea-bordered w-full"
                                rows={3}
                            />
                            <div className="modal-action flex justify-between">
                                <button type="submit" className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-1/2" disabled={isUploading}>
                                    {isUploading ? "儲存中..." : "儲存"}
                                </button>
                                <button type="button" className="btn w-1/2" onClick={() => setShowEditModal(false)} disabled={isUploading}>
                                    取消
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}

            {/* 頭像 Modal（含裁切） */}
            {showAvatarModal && (
                <dialog open className="modal">
                    <div className="modal-box w-11/12 max-w-md">
                        <h3 className="font-bold text-lg text-yellow-600 mb-4">更換頭像</h3>
                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            className="mb-2"
                            onChange={e => handleImagePreview(e, 'avatar')}
                        />
                        {avatarFile && (
                            <div style={{ position: 'relative', width: 300, height: 300, margin: '0 auto' }}>
                                <Cropper
                                    image={avatarPreview}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    cropSize={{ width: 250, height: 250 }}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                    cropShape="round"
                                    showGrid={false}
                                />
                            </div>
                        )}
                        <div className="modal-action flex justify-between">
                            <button
                                type="button"
                                className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-1/2"
                                onClick={handleSaveAvatar}
                                disabled={isUploadingAvatar}
                            >
                                {isUploadingAvatar ? "儲存中..." : "儲存"}
                            </button>
                            <button
                                type="button"
                                className="btn w-1/2"
                                onClick={() => setShowAvatarModal(false)}
                                disabled={isUploadingAvatar}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* 背景照 Modal（含裁切） */}
            {showBgModal && (
                <dialog open className="modal">
                    <div className="modal-box w-11/12 max-w-md">
                        <h3 className="font-bold text-lg text-yellow-600 mb-4">更換背景照</h3>
                        <input
                            ref={bgInputRef}
                            type="file"
                            accept="image/*"
                            className="mb-2"
                            onChange={e => handleImagePreview(e, 'bg')}
                        />
                        {bgFile && (
                            <div style={{ position: 'relative', width: 350, height: 200, margin: '0 auto' }}>
                                <Cropper
                                    image={bgPreview}
                                    crop={bgCrop}
                                    zoom={bgZoom}
                                    aspect={3 / 2}
                                    cropSize={{ width: 270, height: 180 }}
                                    onCropChange={setBgCrop}
                                    onZoomChange={setBgZoom}
                                    onCropComplete={onBgCropComplete}
                                    cropShape="rect"
                                    showGrid={false}
                                />
                            </div>
                        )}
                        <div className="modal-action flex justify-between">
                            <button
                                type="button"
                                className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-1/2"
                                onClick={handleSaveBg}
                                disabled={isUploadingBg}
                            >
                                {isUploadingBg ? "儲存中..." : "儲存"}
                            </button>
                            <button
                                type="button"
                                className="btn w-1/2"
                                onClick={() => setShowBgModal(false)}
                                disabled={isUploadingBg}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default ProfilePage;
