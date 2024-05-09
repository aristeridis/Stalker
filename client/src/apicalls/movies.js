const { axiosInstance } = require(".");
export const AddMovie =async(paylod)=> {
    try {
        const response =await axiosInstance.post("/api/movies/add-movie",paylod);
        return response.data;
        
    } catch (error) {
        return error.response;
    }
}