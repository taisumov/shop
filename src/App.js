import './App.css';
import Navigation from "./ui/navigation/Navigation";
import Footer from "./ui/footer/Footer";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Basket from "./ui/basket/Basket";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [basketIsOpen, setBasketIsOpen] = useState(false)

    useEffect(() => {
        check()
        .then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        })
        .catch((e) => {
            user.setUser({})
            user.setIsAuth(false)
        })
        .finally(() => {
            setLoading(false)
        })
    },[])

    return (
        <div className="App">
            <Navigation basketIsOpen={basketIsOpen} setBasketIsOpen={setBasketIsOpen}/>
            <Basket basketIsOpen={basketIsOpen} setBasketIsOpen={setBasketIsOpen}/>
            <AppRouter/>
            <Footer/>
        </div>
    );
})

export default App;
