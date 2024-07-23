import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL + "/events";

export const getEvents = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const addEvent = async (event) => {
  return await axios.post(`${url}`, event);
};
export const updateEvent = async (id, event) => {
  return await axios.put(`${url}/${id}`, event);
};
export const deleteEvent = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
