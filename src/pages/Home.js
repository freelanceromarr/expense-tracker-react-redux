import Header from "../app/components/Header";
import TransactionsHeader from "../app/components/transactions/TransactionsHeader";
import TransactionsForm from "../app/components/transactions/TransactionsForm";
import TransactionsList from "../app/components/transactions/TransactionsList";
import Footer from "../app/components/Footer";

const Home = () => {
    return (
        <>
            <div class="App">
            <Header/>

            <div class="main">
                <div class="container">
                    {/* transactions header  */}
                    <TransactionsHeader/>
                    
                    {/* transactions form  */}
                    <TransactionsForm/>
                    
                    {/* transactions list  */}

                    <TransactionsList/>
                    
                </div>
            </div>

            <Footer/>
        </div>
        </>
    )
};
export default Home;