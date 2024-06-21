import { axiosInstance } from ".";
export const MakePayment = async (token, amount) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/make-payment",
      token,
      amount
    );
    return response.data;
  } catch (error) {
    return error.data;
  }
};
export const BookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.data;
  }
};

export const GetBookingsByUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/get-bookings-by-user",
      payload
    );
    return response.data;
  } catch (error) {
    return error.data;
  }
}