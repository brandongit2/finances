import {createContext} from 'react';

export const userContextDefaultValue = {
    loading: true,
    isLoggedIn: false,
    email: null as string | null,
    signOut: () => {}
};

export const UserContext = createContext(userContextDefaultValue);
