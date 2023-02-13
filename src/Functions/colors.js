import axios from "axios";

export const createColor = (name, price, description, authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/create-color`, { name, price, description }, {
        headers: {
            authorization: authtoken
        }
    });
}

export const getAllColors = () => {
    return axios.post(`http://127.0.0.1:5000/api/get-colors`);
}

export const deleteColor = (id,authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/delete-color`, { id },
        {
            headers: {
                authorization: authtoken
            }
        });
}

export const getSingleColorById = (id) =>{
    return axios.post(`http://127.0.0.1:5000/api/get-color-by-id`,{id});
}

export const updateColor = (id,name, price, description, authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/update-color`, {id, name, price, description }, {
        headers: {
            authorization: authtoken
        }
    });
}