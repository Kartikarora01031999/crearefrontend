import axios from "axios";

export const createOrUpdateUser = (name, email, authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/create-update-user`,
        {name, email},
        {
            headers: {
                authorization: authtoken,
            },
        });
};

export const currentUser = (authtoken) =>{
    return axios.post(`http://127.0.0.1:5000/api/current-user`,
    {},
    {
        headers: {
            authorization: authtoken,
        },
    }
    );
}

export const sendQuery = (name,email,phone,message) =>{
    return axios.post(`http://127.0.0.1:5000/api/contact-us`,{name, email, phone, message},{});
}