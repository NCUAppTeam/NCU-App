import { Image, VStack } from "../components";
import { DrawerOption } from "./DrawerOption";

const UserInfo = {
    name: "NCU APP",
    avatar: "src/assets/logo.png"
};

export const DrawerSideBar = () => {
    return (
        <div className="flex w-fit drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            {/* Drawer Portal */}
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="drawer-button">
                    <Image src={UserInfo.avatar} children={undefined} className='w-10 rounded-full'></Image>
                </label>
            </div>

            {/* Indise Drawer */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <VStack id="user-avatar">
                        <Image src={UserInfo.avatar} children={undefined} className='mb-2 w-10 rounded-full'></Image>
                        <text className="font-bold">{UserInfo.name}</text>
                        <text className="text-xs">View Profile</text>
                    </VStack>

                    <div className="divider divider-neutral" />

                    <DrawerOption />
                </ul>
            </div>
        </div>
    );
};
