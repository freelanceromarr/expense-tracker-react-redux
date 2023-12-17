import axios from '../../util/axios'

// fetch transactions 
export const getTransactions = async ()=>{
    const response = await axios.get('/transactions');
    return response.data;
}
export const createTransactions = async (data)=>{
    const response = await axios.post('/transactions', data);
    return response.data;
}
export const editTransactions = async (id, data)=>{
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data;
}
export const deleteTransactions = async (id)=>{
   await axios.delete(`/transactions/${id}`);
    return id;
}