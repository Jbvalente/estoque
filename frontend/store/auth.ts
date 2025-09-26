import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    clearToken: () => void;
}

const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const eraseCookie = (name: string) => {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: typeof window !== 'undefined' ? getCookie('accessToken') : null,
    isAuthenticated: typeof window !== 'undefined' ? !!getCookie('accessToken') : false,
    setToken: (token) => {
        setCookie('accessToken', token, 7); // Set cookie for 7 days
        set({ accessToken: token, isAuthenticated: true });
    },
    clearToken: () => {
        eraseCookie('accessToken');
        set({ accessToken: null, isAuthenticated: false });
    },
}));
