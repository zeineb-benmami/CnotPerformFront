import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export async function signup(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function addTRM(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/addTRM`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function addTM(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/addTM`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function addAdmin(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/addAdmin`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

/* export async function signin(userData) {
   try {
     const response = await axios.post(`${BASE_URL}/signin`, userData);
     return response.data;
   } catch (error) {
     throw error.response.data;
   }
 }*/
 export async function getUserByEmail(email) {
  try {
    const response = await axios.get(`${BASE_URL}/getuser-by-email/${email}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export async function signin(userData) {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, userData);
    // Stockage du token JWT dans le localStorage
   // localStorage.setItem("token", response.data.token);
    //console.log(localStorage.getItem('token'));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('data',response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

  export async function getWaitList() {
    try {
      const response = await axios.get(`${BASE_URL}/getWaitList`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  export async function updateUser(userData) {
    try {
      const response = await axios.put(`${BASE_URL}/update`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }


export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getUserData(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/getuser/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getUserWaiting (userId) {
  try {
    const response = await axios.get(`${BASE_URL}/getUserWaiting/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function finishplayerprofile(userData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/finishplayerprofile`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAllPlayers() {
  try {
    const response = await axios.get(`${BASE_URL}/getAllPlayers`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function getAllStaff() {
  try {
    const response = await axios.get(`${BASE_URL}/getAllStaff`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const confirmUser = async (userId) => {
  try {
    const response = await axios.put(`${BASE_URL}/confirm/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const refuseUser = async (userId) => {
  try {
    const response = await axios.put(`${BASE_URL}/refuse/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export async function getUserProfile() {
  try {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (!authUser || !authUser.token) {
      throw new Error('Token manquant');
    }
    const token = authUser.token;
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function updateUserImage(userId, file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const response = await axios.put(`${BASE_URL}/user/profile-image/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // Assuming your backend expects a Bearer token
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function update(id, newData) {
  try {
    const response = await axios.put(`${BASE_URL}/update/${id}`, newData);
    console.log("Mise à jour réussie :", response.data);
    return response.data; // Retourne les données de réponse pour une utilisation ultérieure si nécessaire
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour :",
      error.response ? error.response.data : error.message
    );
    throw error; // Propager l'erreur pour une gestion ultérieure
  }
}

export async function updatePassword(userId, oldPassword, newPassword) {
  if (!userId) throw new Error('UserId is undefined');

  try {
    const response = await axios.put(`${BASE_URL}/update-password/${userId}`, {
      oldPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export async function forgotPassword(email) {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const verifyRecoveryCode = async (email, recoveryCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-recovery-code`, { email, recoveryCode });
    return response.data; // Return the response data from the server
  } catch (error) {
    // If there's an error, throw the error data or a default error message
    throw error.response ? error.response.data : new Error('An unexpected error occurred');
  }
};


export async function getRoleF() {
  try {
    const response = await axios.get(`${BASE_URL}/getRoleF`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const updatePasswordAfterRecovery = async (email, newPassword) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-password-recovery`, { email, newPassword });
    return response.data;
  } catch (error) {
    // Gérer les erreurs de la réponse ici
    console.error('Error updating password:', error.response);
    throw error;
  }
}
