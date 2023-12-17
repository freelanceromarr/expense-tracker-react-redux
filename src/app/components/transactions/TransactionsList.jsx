import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { editTransaction, fetchTransactions, removeTransactions } from '../../../features/transactions/transactionSlice';
const TransactionsList = ()=>{
    const dispatch = useDispatch();
    const {transactions, isLoading, isError} = useSelector(state=>state.transactions);
    useEffect( ()=>{
        dispatch( fetchTransactions())
    } ,[dispatch]);

    const editHandler = (transac)=>{
        dispatch(editTransaction(transac))
    }
    const deleteHandler = (id)=>{
        dispatch(removeTransactions(id));
    }
    //decide what to render;
    let content = null;
    if (isLoading && !isError) {
        content = <p className="text-center">Loading...</p>
    }
    if (!isLoading && isError) {
        content = <p className="text-center">Something wrong</p>
    }
    if (!isLoading && !isError && transactions.length < 1) {
        content = <p className="text-center">No Transactions</p>
    }
    if (!isLoading && !isError && transactions.length >0) {
        content = transactions.map(transac=>{
           const {id, name, amount, type}= transac;
            return <li class={`transaction income ${type} `}>
            <p>{name}</p>
            <div class="right">
                <p>৳ {amount}</p>
                <button class="link" onClick={()=>editHandler(transac)} >
                    <img
                        class="icon"
                        src="/images/edit.svg"
                        alt="edit"
                    />
                </button>
                <button class="link" onClick={e=>deleteHandler(id)} >
                    <img
                        class="icon"
                        src="/images/delete.svg"
                        alt="delete"
                    />
                </button>
            </div>
        </li>
        })
    }
    return (
    <>
        <p class="second_heading">Your Transactions:</p>
        <div class="conatiner_of_list_of_transactions">
            <ul>
                {content}
            </ul>
        </div>
    </>
    )
}
export default TransactionsList;

