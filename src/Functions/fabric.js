import axios from 'axios';

export const createFabric = (name,image,price,description,category,authtoken) =>{
    return axios.post(`http://127.0.0.1:5000/api/admin/create-fabric`,{name,image,price: parseFloat(price),description,category},{
        headers: {
            authorization: authtoken,
        }
    });
}

export const getFabrics = () =>{
    return axios.post(`http://127.0.0.1:5000/api/get-fabrics`,{});
}

export const getSingleFabric = (id,authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/get-fabric-by-id`,{id},{
        headers: {
            authorization: authtoken,
        }
    });
}

export const removeSingleFabric = (id,authtoken) => {
    return  axios.post(`http://127.0.0.1:5000/api/admin/delete-fabric`,{id},
    {
        headers: {
            authorization: authtoken,
        }
    });
}

export const updateSingleFabric = (id,name,price,image,description,category,authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/update-fabric`,{category,id,name,image,price: parseFloat(price),description},{
        headers: {
            authorization: authtoken,
        }
    });
} 

export const getFabricByCategory = (category) => {
    return axios.post(`http://127.0.0.1:5000/api/get-fabric-by-category`,{category});
}