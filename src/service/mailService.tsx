import { Bounce, toast } from "react-toastify";
import API from "../config/axiosConfig";



export const getEmails = async (mailAccount : any) =>{
    return API.post(`mail/fetchemails`, mailAccount);
}

export const getEmailById = async (id: string) =>{
    return API.get(`mail/fetchemail/${id}`)
}

export const bookmarkEmail = async (id : string) =>{
    const response = API.put(`mail/bookmark/${id}`);
    const data = (await response).data;
    console.log(data);
    if(data.status === 'success'){
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });            
      }
    
    return response
}

export const setEmailAccount = async (account : any) => {
    return API.post('mail/setupaccount', account)
}

export const getMailAccount = async (id : string) =>{
    return API.get(`mail/getmailadress/${id}`)
}

export const deleteEmail = async (id : string) =>{
    return API.get(`mail/getmailadress/${id}`)
}

export const verifPassword = async (mailAccount:string, password : string) =>{
    return API.get(`mail/verifpassword/${mailAccount}/${password}`)
}

export const downoadFile = async (fileName: string) =>{
    return API.get(`mail/download/${fileName}`)
}

export const verifAccountSet = async (id: string) =>{
    return API.get(`mail/verifyaccountset/${id}`)
}