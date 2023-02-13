import axios from 'axios';

export const  createCart = (products,total_price,authtoken) =>{
    return axios.post("http://127.0.0.1:5000/api/add-product-to-cart",{products,total_price},{
        headers: {
            authorization: authtoken,
        },
    });
}

export const  getUserCart = (authtoken) =>{
    return axios.post("http://127.0.0.1:5000/api/get-user-cart",{},{
        headers: {
            authorization: authtoken,
        },
    });
}

export const deleteUserCart = (authorization) =>{
    return axios.post("http://127.0.0.1:5000/api/delete-cart",{},{
        headers : {
            authorization
        },
    });
}
