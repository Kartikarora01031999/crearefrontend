import axios from 'axios';

export const createOrder = (products,payment,type,price,address,phone,fabric,color,authtoken,size,quantity) =>{
    return axios.post("http://127.0.0.1:5000/api/create-order",
    {products,payment,type,price: parseFloat(price),address,phone,fabric,color,quantity,size},{
        headers: {
            authorization: authtoken,
        },
    });
}

export const getAllVirtualOrders = async(authtoken) => {
    return await axios.post(`http://127.0.0.1:5000/api/admin/get-orders-virtual`,{},
    {
        headers: {
            authorization: authtoken,
        }
    });
}

export const getAllOrders = async(authtoken) => {
    return await axios.post(`http://127.0.0.1:5000/api/admin/get-orders`,{},
    {
        headers: {
            authorization: authtoken,
        }
    });
}

export const getOrdersForUser = async(authtoken)=>{
    return await axios.post(`http://127.0.0.1:5000/api/get-user-order`,{},
    {
        headers: {
            authorization: authtoken,
        }
    });
}
export const updateOrderStatus = async(authtoken,order_id,order_status,product_id,product_count,size)=>{
    return await axios.post(`http://127.0.0.1:5000/api/admin/update-order-status`,{order_id,order_status,product_id,product_count,size},
    {
        headers: {
            authorization: authtoken,
        }
    }
    );
}

export const createOrderWithoutAuth = (products,payment,type,price,address,phone,fabric,color,size,quantity,email) =>{
    return axios.post("http://127.0.0.1:5000/api/create-order-without-auth",
    {products,payment,type,price: parseFloat(price),address,phone,fabric,color,quantity,size,email});
}

export const getCouponByName = (name) =>{
    return axios.post("http://127.0.0.1:5000/api/get-discount-by-name",{name});
}