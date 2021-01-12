import {createContext} from 'react';

export const userContextDefaultValue = {
    loading: true,
    isSignedIn: false,
    email: null as string | null,
    signOut: () => {}
};

export const UserContext = createContext(userContextDefaultValue);
