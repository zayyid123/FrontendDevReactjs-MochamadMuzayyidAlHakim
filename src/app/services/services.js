import { axiosInstance } from "../config/fetchAxios";

export const GetAllDataRestaurant = async (page=1, limit=5, category='') => {
    const response = axiosInstance.get(`/restaurant?_page=${page}&_limit=${limit}&category_like=${category}`);
    return response;
};