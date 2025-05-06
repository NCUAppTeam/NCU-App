import React, { useEffect, useState } from 'react';
import UserController from '../../../backend/user/Controllers/UserController';
import { DrawerSideBar } from "./DrawerSideBar";

export const Header: React.FC = () => {

    const [userName, setUserName] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<string>('');
    const [error, setError] = useState<unknown>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userController = new UserController();
                const data = await userController.getCurrentUser();

                if (data) {
                    setUserName(data.name);
                    setUserAvatar(data.avatar);
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
        return null;
    }
    if (error) {
        console.log('error', error);
    }

    return (
        <div className="justify-start z-40">
            <DrawerSideBar name={userName} avatar={userAvatar} />
        </div>
    );
};
