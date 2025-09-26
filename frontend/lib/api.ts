import { toast } from "@/hooks/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.error) || response.statusText;
        toast({
            title: "Erro na API",
            description: error,
            variant: "destructive",
        });
        return Promise.reject(error);
    }
    return data as T;
}

function getAuthHeader(): { [key: string]: string } {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return { 'Authorization': `Bearer ${token}` };
    }
    return {};
}

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
        });
        return handleResponse<T>(response);
    },

    post: async <T>(endpoint: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            },
            body: JSON.stringify(body),
        });
        return handleResponse<T>(response);
    },
    
    // TODO: Implement put, delete methods
};