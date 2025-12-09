import axios from 'axios';

// Get the base URL for API calls (works in both client and server)
const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        // Client-side: use relative URL
        return '';
    }
    // Server-side: use environment variable or default to localhost
    return process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3000';
};

export const ssr = {
    getTT: async () => {
        try {
            const baseUrl = getBaseUrl();
            const response = await axios.get(`${baseUrl}/api/tt`);
            return response.data; // Return only the data, not the entire response object
        } catch (error) {
            // Properly handle and throw errors instead of returning them
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.error || 
                    error.message || 
                    'Failed to fetch trending tools'
                );
            }
            throw error;
        }
    },
    getPopular: async () => {
        try {
            const baseUrl = getBaseUrl();
            const response = await axios.get(`${baseUrl}/api/popular`);
            return response.data; // Return only the data, not the entire response object
        } catch (error) {
            // Properly handle and throw errors instead of returning them
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.error || 
                    error.message || 
                    'Failed to fetch trending tools'
                );
            }
            throw error;
        }
    },
    getDp: async () => {
        try {
            const baseUrl = getBaseUrl();
            const response = await axios.get(`${baseUrl}/api/dptools`);
            return response.data; // Return only the data, not the entire response object
        } catch (error) {
            // Properly handle and throw errors instead of returning them
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.error || 
                    error.message || 
                    'Failed to fetch trending tools'
                );
            }
            throw error;
        }
    },
   getNf : async () => {
        try {
            const baseUrl = getBaseUrl();
            const response = await axios.get(`${baseUrl}/api/nf`);
            return response.data; // Return only the data, not the entire response object
        } catch (error) {
            // Properly handle and throw errors instead of returning them
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.error || 
                    error.message || 
                    'Failed to fetch trending tools'
                );
            }
            throw error;
        }
    },
    getSn : async () => {
        try {
            const baseUrl = getBaseUrl();
            const response = await axios.get(`${baseUrl}/api/sub-categories`);
            return response.data; // Return only the data, not the entire response object
        } catch (error) {
            // Properly handle and throw errors instead of returning them
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.error || 
                    error.message || 
                    'Failed to fetch trending tools'
                );
            }
            throw error;
        }
    }
};