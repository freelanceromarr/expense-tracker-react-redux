import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createTransactions, deleteTransactions, editTransactions, getTransactions } from './transactonAPI';

const initialState = {
    transactions: [],
    isLoadding: false,
    isError: false,
    error: '',
    editData: {},
}

export const fetchTransactions = createAsyncThunk('transactions/fetch', async ()=>{
    const transactions = await getTransactions();
    return transactions;
})
export const postTransactions = createAsyncThunk('transactions/create', async (data)=>{
    const transactions = await createTransactions(data);
    return transactions;
})
export const updateTransactions = createAsyncThunk('transactions/update', async ({id,input})=>{
    const transactions = await editTransactions(id,input);
    return transactions;
})
export const removeTransactions = createAsyncThunk('transactions/delete', async (id)=>{
    const transactions = await deleteTransactions(id);
    return transactions;
})
const transactionsSlice = createSlice({
    name : 'transactions',
    initialState,
    reducers: {
        editTransaction: (state, action)=>{
            state.editData = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchTransactions.pending, (state)=>{
            state.isLoadding = true;
            state.isError = false;
        })
        .addCase(fetchTransactions.fulfilled, (state, action)=>{
            state.isLoadding = false;
            state.transactions = action.payload
            state.isError = false;
            state.error = ''
        })
        .addCase(fetchTransactions.rejected, (state, action)=>{
            state.isLoadding = false;
            state.transactions = []
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(postTransactions.pending, (state)=>{
            state.isLoadding = true;
            state.isError = false;
        })
        .addCase(postTransactions.fulfilled, (state, action)=>{
            state.isLoadding = false;
            state.transactions.push(action.payload)
            state.isError = false;
            state.error = ''
        })
        .addCase(postTransactions.rejected, (state, action)=>{
            state.isLoadding = false;
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(updateTransactions.pending, (state)=>{
            state.isLoadding = true;
            state.isError = false;
        })
        .addCase(updateTransactions.fulfilled, (state, action)=>{
            state.isLoadding = false;
            state.transactions= state.transactions.map((transac)=>{
                if (transac.id === action.payload.id) {
                    return {...action.payload}
                }else{return transac }
            })
            state.editData={}
            state.isError = false;
            state.error = ''
        })
        .addCase(updateTransactions.rejected, (state, action)=>{
            state.isLoadding = false;
            state.isError = true;
            state.error = action.error.message
        })
        .addCase(removeTransactions.pending, (state)=>{
            state.isLoadding = true;
            state.isError = false;
        })
        .addCase(removeTransactions.fulfilled, (state, action)=>{
            state.isLoadding = false;
            state.transactions= state.transactions.filter((transac)=>{
                return transac.id !== action.payload;
            })
            state.isError = false;
            state.error = ''
        })
        .addCase(removeTransactions.rejected, (state, action)=>{
            state.isLoadding = false;
            state.isError = true;
            state.error = action.error.message
        })
    }

});

export default transactionsSlice.reducer;
export const {editTransaction} = transactionsSlice.actions;