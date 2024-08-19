import API from "../config/axiosConfig";


export const getBoursebyId = async (id:string) => {
    id = id || '';
    return await API.get(`bourses/${id}`);
  };
export const getBourseByProgramme = async (programme:string) => {
    programme = programme || '';
    return await API.get(`bourses/getboursebygroupe/${programme}`);
  };
export const getBourseByFederation = async (id:string) => {
  id = id || '';
    return await API.get(`bourses/getboursebyfederation/${id}`);
  };
  export const addBourse = async (event:any) => {
    return await API.post('bourses', event);
  };
  export const editBourse = async (id:string, event:any) => {
    return await API.put(`bourses/${id}`, event);
  };
  export const deleteBourse = async (id:string) => {
    return await API.delete(`bourses/${id}`);
  };
  