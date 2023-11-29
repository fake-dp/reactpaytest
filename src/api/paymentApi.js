import customAxios from "./customApi";

export const postPaymentSubscription = async (data) => {
    try {
        const response = await customAxios.post(`/api/members/v1/tickets/payment`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}