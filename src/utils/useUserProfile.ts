import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import User from "../models/User.ts";

export const useUserProfile = () : User | undefined => {
    const { user } = useAuth0();
    const [userProfile, setUserProfile] = useState<User|undefined>(undefined);

    useEffect(() => {
        if (user) {
            const { name, lastname, email, role } = user;
            setUserProfile({
                name: name || '',
                lastname: lastname || '',
                email: email || '',
                role,
                id: role === 'admin' ? '123' : '111',
            });
        }
    }, [user]);

    return userProfile;
}
