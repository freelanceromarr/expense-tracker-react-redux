import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTransactions, updateTransactions } from "../../../features/transactions/transactionSlice";

const TransactionsForm = ()=>{
    const [isEditable, setIsEditable] = useState(false)
    const dispatch = useDispatch()
    const {editData}= useSelector(state=>state.transactions)
    console.log(editData);
    const [input, setInput]=useState({
        name: '',
        amount: 0,
        type:''
    });

    const formReset = ()=>{
      setInput({ name: '',amount: 0,type:''});
    }
    //submit new transaction
    const formHandler = (e)=>{
        e.preventDefault();
        dispatch(postTransactions(input));
        formReset();
    }
    const updateHandleer = (e)=>{
        e.preventDefault();
        dispatch(updateTransactions({id:editData.id, input}));
        setIsEditable(false)
        formReset();
    }
    
    //eiditing
   useEffect(()=>{
    if(editData?.id){
        setIsEditable(true)
        const {name, type, amount} = editData || {};
        setInput({ name: name,amount: amount,type:type});
    }    
   },[editData])
    return (
        <div class="form">
                        <h3>Add new transaction</h3>
                        <form onSubmit={e=>isEditable?updateHandleer(e):formHandler(e)} >

                        <div class="form-group">
                            <label for="transaction_name">Name</label>
                            <input
                                onChange={e=>setInput({...input, name: e.target.value})}
                                value={input.name}
                                type="text"
                                name="transaction_name"
                                placeholder="My Salary"
                                required
                            />
                        </div>

                        <div class="form-group radio">
                            <label for="transaction_type">Type</label>
                            <div class="radio_group">
                                <input
                                    onChange={e=>setInput({...input, type: 'income'})}
                                    type="radio"
                                    value={input.type}
                                    name="transaction_type"
                                    checked={input?.type ==='income'?true:false}
                                    required
                                />
                                <label for="transaction_type">Income</label>
                            </div>
                            <div class="radio_group">
                                <input
                                    onChange={e=>setInput({...input, type: 'expense'})}
                                    type="radio"
                                    value={input.type}
                                    name="transaction_type"
                                    placeholder="Expense"
                                    checked={input?.type ==='expense'? true:false}
                                />
                                <label for="transaction_type">Expense</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="transaction_amount">Amount</label>
                            <input
                                onChange={e=>setInput({...input, amount: Number(e.target.value)})}
                                value={input.amount}
                                type="number"
                                placeholder="300"
                                name="transaction_amount"
                                required
                            />
                        </div>

                        <button class="btn">{isEditable? "Update Transaction": "Add Transaction"}</button>
                    </form>

                        <button class="btn cancel_edit">Cancel Edit</button>
                    </div>
    )
}
export default TransactionsForm;