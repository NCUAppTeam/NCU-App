import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import defaultAvatar from '../../assets/logo.png';
import defaultBackground from '../../assets/squirrel.jpg';
import UserController from '../../backend/user/Controllers/UserController';
import { AuthGuard } from '../../utils/auth';

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
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        avatar: defaultAvatar,
        profileBackground: defaultBackground,
        name: '李小明',
        username: 'xiaoming',
        bio: '喜歡松鼠、熱愛開發的資訊系學生。',
        department: '資訊工程學系',
        email: 'xiaoming@example.com',
        grade: '大三',
        identity: '學生',
        joinedAt: '2022-09-01',
        phone: '0912345678',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (name: string, file: File | null) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFormData((prev) => ({ ...prev, [name]: reader.result }));
        };
        if (file) reader.readAsDataURL(file);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-red-100 shadow-xl/30 rounded-2xl p-4 sm:p-6 lg:p-8">
            {/* Profile Background */}
            <div className="relative h-48 bg-gray-200 rounded-xl group">
                <img
                    src={formData.profileBackground}
                    alt="Profile Background"
                    className="object-cover w-full h-full rounded-xl cursor-pointer hover:opacity-80"
                    onClick={() => document.getElementById('profileBackgroundInput')?.click()}
                />
                {isEditing && (
                    <div className="absolute top-2 right-2">
                        <input
                            id="profileBackgroundInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('profileBackground', e.target.files?.[0] || null)}
                            className="hidden"
                        />
                    </div>
                )}
                {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-white bg-black bg-opacity-50 rounded-full p-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10l1.664-2.664A2 2 0 016.236 6h11.528a2 2 0 011.572.836L21 10m-9 4a4 4 0 100-8 4 4 0 000 8zm-7 6h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                )}
                <div className="absolute -bottom-12 left-6">
                    <img
                        src={formData.avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-4 border-white object-cover cursor-pointer"
                        onClick={() => document.getElementById('avatarInput')?.click()}
                    />
                    {isEditing && (
                        <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('avatar', e.target.files?.[0] || null)}
                            className="hidden"
                        />
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="pt-16 px-6 pb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border rounded px-2 py-1"
                            />
                        ) : (
                            formData.name
                        )}
                    </h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-blue-600 hover:underline"
                    >
                        {isEditing ? '完成' : '編輯個人檔案'}
                    </button>
                </div>
                <p className="text-gray-500">@{formData.username}</p>

                <div className="mt-4 space-y-2">
                    <Field label="自我介紹" name="bio" value={formData.bio} isEditing={isEditing} handleChange={handleChange} multiline />
                    <Field label="系所" name="department" value={formData.department} isEditing={isEditing} handleChange={handleChange} />
                    <Field label="年級" name="grade" value={formData.grade} isEditing={isEditing} handleChange={handleChange} />
                    <Field label="身分" name="identity" value={formData.identity} isEditing={isEditing} handleChange={handleChange} />
                    <Field label="電子信箱" name="email" value={formData.email} isEditing={isEditing} handleChange={handleChange} />
                    <Field label="電話" name="phone" value={formData.phone} isEditing={isEditing} handleChange={handleChange} />
                    <div className="text-gray-600 text-sm">
                        加入時間：{formData.joinedAt}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    name,
    value,
    isEditing,
    handleChange,
    multiline = false,
}: {
    label: string;
    name: string;
    value: string;
    isEditing: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    multiline?: boolean;
}) {
    return (
        <div>
            <label className="block font-semibold text-gray-700 mb-1">{label}</label>
            {isEditing ? (
                multiline ? (
                    <textarea
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                    />
                ) : (
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                    />
                )
            ) : (
                <p className="text-gray-800">{value}</p>
            )}
        </div>
    );
}