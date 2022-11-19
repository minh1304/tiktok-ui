import * as httpRequest from '~/untils/httpRequest';

export const login = async (email, password) => {
  try {
    return await httpRequest.post('auth/login', {
      email: email,
      password: password,
    })
  } catch (error) {
    return error.response.data
  }
}