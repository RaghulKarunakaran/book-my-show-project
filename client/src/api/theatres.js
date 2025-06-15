import { axiosInstance } from ".";

// Get all theatres for the Admin route
export const getAllTheatresForAdmin = async () => {
    try{
        const response = await axiosInstance.get('/api/theatres/get-all-theatres');
        return response.data;
    }catch(err){
        return err.response;
    }
}

// Update Theatre
export const updateTheatre = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/theatres/update-theatre', payload);
        return response.data;
    }catch(err){
        return err.resposne;
    }
}