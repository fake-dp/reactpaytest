import customAxios from "./customApi";
import axios from "axios";
export const postPaymentSubscription = async (data) => {
    try {
        const response = await customAxios.post(`/api/members/v1/tickets/payment`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPaymentUserInfo = async (id) => {
    try {
        const response = await axios.get(`http://27.96.135.229:8080/api/members/v1/paymentLink/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}