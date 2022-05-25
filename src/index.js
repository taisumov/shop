import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import BasketStore from "./store/BasketStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        basket: new BasketStore()
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);
