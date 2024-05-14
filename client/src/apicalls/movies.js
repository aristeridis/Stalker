const { axiosInstance } = require(".");
export const AddMovie =async(paylod)=> {
    try {
        const response =await axiosInstance.post("/api/movies/add-movie",paylod);
        return response.data;
        
    } catch (error) {
        return error.response;
    }
}
export const GetAllMovies= async()=>{
    try {
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.data;
    }
}