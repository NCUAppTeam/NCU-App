import { FaSignOutAlt } from "react-icons/fa";
import { IoLogoFacebook, IoSettingsSharp } from "react-icons/io5";

import {
    supabase
} from "../../../utils/supabase";


const signOut = async () => {
    await supabase.auth.signOut().then(() => {
        window.location.href = '/';
    });
};

export default function SidebarFooter() {
    return (
        <div className="w-full self-end">
            <div className="divider divider-neutral" />

            <p className="hover:bg-gray-50 hover:text-black my-2 rounded-md border border-gray-300 p-2 cursor-pointer text-left text-lg underline justify-start flex items-center"
                onClick={() => {
                    alert('此功能尚未開放，敬請期待！');
                }}
                title='Settings'>
                <IoSettingsSharp className="inline-block mr-2" />
                Settings
            </p>
            <a href='https://www.facebook.com/NCUAppTeam/?locale=zh_TW' target="_blank" rel="noopener noreferrer">
                <p className="hover:bg-gray-50 hover:text-black my-2 rounded-md border border-gray-300 p-2 cursor-pointer text-left text-lg underline">
                    <IoLogoFacebook className="inline-block mr-2" />
                    About Us
                </p>
            </a>
            <p className="hover:bg-gray-50 hover:text-black my-2 rounded-md border border-gray-300 p-2 cursor-pointer text-left text-lg underline" onClick={signOut} title='Sign Out'>
                <FaSignOutAlt className="inline-block mr-2" />
                Sign Out
            </p>
        </div>
    );
}