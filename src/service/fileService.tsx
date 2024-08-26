import API from "../config/axiosConfig";

export const uploadFile = async (file, id, name) => {
    return await API.post(`files/${id}/${name}`, file);
  };