import { useSelector } from "react-redux";

const TransactionsHeader = ()=>{
    const {transactions} = useSelector(state=>state.transactions) 
    
    let balance = transactions?.reduce((total, transac)=>{
        console.log(transac);
        if(transac.type ==='income'){
            return total += transac.amount;
        }
        if(transac.type ==='expense'){
            return total -= transac.amount;
        }
    },0)
    
    return (
    <div class="top_card">
        <p>Your Current Balance</p>
        <h3>
            <span>৳</span>
            <span>{balance}</span>
        </h3>
    </div>
)
}
export default TransactionsHeader;