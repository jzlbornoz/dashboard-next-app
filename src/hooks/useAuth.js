import React, { useContext, useState } from 'react';
import AuthContext from '@context/AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import endPoints from '@services/api';

export function ProviderAuth({ children }) {
    const auth = useProviderAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProviderAuth() {
    const [user, setUser] = useState(null);
    const [error , setError] = useState(false);

    const signIn = async (email, password) => {
        const options = {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };
        //==Lectura del AccessToken que viene desde la api, para posteriormente agregarla a una cookie
        const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
        if (access_token) {
            Cookies.set('token', access_token.access_token, { expires: 5 })
        }
    };

    return {
        user,
        signIn,
        error,
        setError
    };
};

export default useAuth;
