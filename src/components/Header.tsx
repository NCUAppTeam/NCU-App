import { HStack } from "../components";
import { supabase } from "../utils/supabase";
import { DrawerSideBar } from "./DrawerSideBar";



import React, { useEffect, useState } from 'react';

export const Header: React.FC = () => {

    const [userName, setUserName] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [error, setError] = useState<unknown>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = (await supabase.auth.getUser()).data?.user?.id;
                if (!userId) {
                    throw new Error('User ID is undefined');
                }
                const { data } = await supabase
                    .from('members')
                    .select(`*, identities ( identity_no, identity_name )`)
                    .eq('uuid', userId);

                if (data && data.length > 0) {
                    setUserName(data[0].name);
                    setUserAvatar(data[0].avatar);
                } else {
                    throw new Error('User data not found');
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            }
        };
        fetchData();
    }, []);

    if (!userName || !userAvatar) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.log('error', error);
    }

    return (
        <div className="p-2 gap-2 justify-start">
            <HStack className='items-center'>
                <DrawerSideBar name={userName} avatar={userAvatar} />
                <div className='flex flex-1 justify-center'>
                    <span className='mr-10'>NCU App</span>
                </div>
            </HStack>
        </div>
    );
};
