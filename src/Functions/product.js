import axios from "axios";
export const createProduct = (name, price, category, quantity, image, size, description, type, authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/create-product`, { name, price: parseFloat(price), size, description, category,type,quantity: parseInt (quantity), image },
        {
            headers: {
                authorization: authtoken,
            }
        });
}

export const createVirtualProduct = (name, category, image, size, description, type, price, authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/create-product`, { name, size, description, category,type, image, price: parseFloat(price)},
        {
            headers: {
                authorization: authtoken,
            }
        });
}

export const updateSingleVirtualProduct = (_id,name, category, image, size, description, price, authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/update-product`, { _id, name, size, description, category, image,price: parseFloat(price)},
        {
            headers: {
                authorization: authtoken,
            }
        });
}

export const getAllProducts = async(authtoken) => {
    return await axios.post(`http://127.0.0.1:5000/api/admin/get-products`);
}

export const getAllVirtualProducts = async() => {
    return await axios.post(`http://127.0.0.1:5000/api/admin/get-products-virtual`,{});
}

export const getSingleProduct = async(_id) => {
    return axios.post(`http://127.0.0.1:5000/api/single-product`,{_id});
}

export const getSingleVirtualProduct = async(_id) => {
    return axios.post(`http://127.0.0.1:5000/api/single-product-virtual`,{_id});
}

export const deleteSingleProduct = async(authtoken,_id) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/delete-product`,{_id},
    {
        headers: {
            authorization: authtoken,
        }
    });
}

export const updateSingleProduct = async (_id, name,price, category, quantity, image, size, description, type, authtoken) => {
    return axios.post(`http://127.0.0.1:5000/api/admin/update-product`, {_id, name, price: parseFloat(price), size, description, category,type,quantity: parseInt (quantity), image },
        {
            headers: {
                authorization: authtoken,
            }
        });
}

export const getProductByCount = (count) =>{
    return axios.post("http://127.0.0.1:5000/api/get-product-by-count",{count});
}

export const getProductByfabric = (id) =>{
    return axios.post("http://127.0.0.1:5000/api/get-product-by-fabric",{id});
}


export const getProductByPrice = (min,max,category,page,total_count) =>{
    return axios.post("http://127.0.0.1:5000/api/get-products-by-price",{min,max,category,page,total_count});
}

export const getProductByAvailability = (page,total_count) =>{
    return axios.post("http://127.0.0.1:5000/api/get-products-in-stock",{page,total_count});
}
export const getProductByAvailability1 = (page,total_count) =>{
    return axios.post("http://127.0.0.1:5000/api/get-products-out-of-stock",{page,total_count});
}

export const getProductsByCategory = (category,page,total_count) =>{
    return axios.post("http://127.0.0.1:5000/api/get-products-by-category",{category,page,total_count});
}

export const getProductByPage = (page,total_count) =>{
    return axios.post("http://127.0.0.1:5000/api/get-product-by-page",{page,total_count});
}

export const searchProduct = (query) => {
    return axios.post("http://127.0.0.1:5000/api/product-search",{query});
}

export const getVirtualByCategory = (category) =>{
    return axios.post("http://127.0.0.1:5000/api/get-virtual-products-by-category",{category});
}