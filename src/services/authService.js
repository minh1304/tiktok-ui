import * as httpRequest from '~/untils/httpRequest';

export const login = async (email, password) => {
    try {
        return await httpRequest.post('auth/login', {
            email: email,
            password: password,
        });
    } catch (error) {
        return error.response.data;
    }
};
export const register = async (type, username, password) => {
    try {
        return await httpRequest.post('auth/register', JSON.stringify({type: type, email: username, password: password}), {
            

            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return error.response.data;
    }
};
