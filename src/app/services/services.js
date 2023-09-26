import { axiosInstance } from "../config/fetchAxios";

export const GetAllDataRestaurant = async () => {
    const response = axiosInstance.get(`/restaurant`);
    return response;
};