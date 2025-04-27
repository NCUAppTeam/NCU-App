import { Image, VStack } from "../components";
import { supabase } from "../utils/supabase";
import { DrawerOption } from "./DrawerOption";


const signOut = async () => {
    await supabase.auth.signOut().then(() => {
        window.location.href = '/';
    });
};

export const DrawerSideBar = ({ name, avatar }: { name: string, avatar: string }) => {
    return (
        <div className="flex w-fit drawer z-10">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />


            <div className="drawer-content">
                <label htmlFor="my-drawer" className="drawer-button">
                    <Image src={avatar} children={undefined} className='w-10 rounded-full'></Image>
                </label>
            </div>

            {/* Indise Drawer */}
            <div className="drawer-side grid content-between">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 text-base-content h-screen w-80 p-4 grid">
                    {/* Sidebar content here */}
                    <VStack className="h-full self-start">
                        <Image src={avatar} children={undefined} className='mb-2 w-10 rounded-full'></Image>
                        <p className="font-bold">{name}</p>
                        <p className="text-xs">View Profile</p>


                        <div className="divider divider-neutral" />

                        <DrawerOption />


                    </VStack>

                    <div className="self-end mb-5">
                        <div className="divider divider-neutral" />
                        <p className="text-left text-lg">Settings</p>
                        <p className="text-left text-lg">About Us</p>
                        <p className="text-left text-lg" onClick={signOut}>Sign Out</p>
                    </div>
                </ul>
            </div>
        </div>
    );
};
