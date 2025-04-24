const TOKEN_KEY = 'authToken';

export const authService = {
    login: async (credentials) => {
        // Simuler un utilisateur existant
        const mockUser = {
            username: 'admin',
            password: 'password123',
        };

        // Vérifier les identifiants
        if (
            credentials.username === mockUser.username &&
            credentials.password === mockUser.password
        ) {
            const token = 'mock-jwt-token'; // Simuler un token JWT
            localStorage.setItem(TOKEN_KEY, token);
            return { token };
        } else {
            throw new Error('Nom d’utilisateur ou mot de passe incorrect');
        }
    },


    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated: () => {
        return !!localStorage.getItem(TOKEN_KEY);
    },
};