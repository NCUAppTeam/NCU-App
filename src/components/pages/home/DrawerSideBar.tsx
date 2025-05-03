import { Image, VStack } from "../..";
import { DrawerOption } from "./DrawerOption";
import SidebarFooter from "./SidebarFooter";
import { SmallTalk } from "./smallTalk";

export const DrawerSideBar = ({ name, avatar }: { name: string, avatar: string }) => {
    return (
        <div className="flex xl:sticky xl:top-0">
            {/* Drawer for smaller screens */}
            <div className="px-3 py-4 w-fit xl:hidden drawer z-40" title='開啟側邊欄 Open sidebar'>
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <label htmlFor="my-drawer" className="drawer-content flex flex-row items-center gap-3 drawer-button">
                    <div>
                        <Image src={avatar} children={undefined} className="w-10 rounded-full" />
                    </div>
                    <div className="text-sm font-bold text-gray-700">
                        {name}
                    </div>
                </label>
                <div className="drawer-side grid content-between">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content h-screen w-80 p-4 grid overflow-y-auto">
                        <VStack className="h-full self-start">
                            <Image src={avatar} children={undefined} className="mb-2 w-10 rounded-full" />
                            <p className="font-bold">{name}</p>
                            <SmallTalk />
                            <p className="text-xs">View Profile</p>
                            <div className="divider divider-neutral" />
                            <DrawerOption />
                        </VStack>
                        <SidebarFooter />
                    </ul>
                </div>
            </div>

            {/* Fixed sidebar for larger screens */}
            <div className="hidden xl:flex flex-col bg-base-200 text-base-content h-screen w-80 p-4 overflow-y-auto" title='開啟側邊欄 Open sidebar'>
                <VStack className="w-full h-full self-start">
                    <Image src={avatar} children={undefined} className="mb-2 w-10 rounded-full" />
                    <p className="font-bold">{name}</p>
                    <SmallTalk />
                    <p className="text-xs">View Profile</p>

                    <div className="divider divider-neutral" />

                    <DrawerOption />
                </VStack>
                <SidebarFooter />
            </div>
        </div >
    );
};