const { axiosInstance } = require('./index');

export const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get('api/movies/get-all-movies');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post('api/movies/add-movie', values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.put('api/movies/update-movie', values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getMovieById = async (id) => {
    try{
        const response = await axiosInstance.get(`/api/movies/movie/${id}`)
        return response.data;
    }catch(err){
        return err.response
    }
}

export const deleteMovie = async (values) => {
    const movieId = values.movieId;
    try {
        const response = await axiosInstance.delete('api/movies/delete-movie', { data: { movieId } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}