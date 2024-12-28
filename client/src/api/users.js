const { axiosInstance } = require('./index');

export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post('api/users/login', value);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}