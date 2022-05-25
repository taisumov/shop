import React from 'react';
import {useState} from "react";
import AccountSettings from "./AccountSettings";
import Orders from "./Orders";
import Addresses from "./Addresses";
import AdminUserList from "./AdminUserList";
import Items from "./Items";
import Categories from "./Categories";

const Admin = () => {

    const [tabs, setTabs] = useState([
        {id: 1, name: 'Пользователи'},
        {id: 2, name: 'Товары'},
        {id: 3, name: 'Категории'},
    ])

    const [activeTab, setActiveTab] = useState(<AdminUserList/>)

    const makeActive = (e, id) => {

        if (id === 1) {
            setActiveTab(<AdminUserList/>)
        }
        if (id === 2) {
            setActiveTab(<Items/>)
        }
        if (id === 3) {
            setActiveTab(<Categories/>)
        }

        Array.from(document.getElementsByClassName("profileNav__item")).map(item => {
            item.className = "profileNav__item"
        })
        e.target.className = e.target.className === "profileNav__item" ? "profileNav__item active" : "profileNav__item"
    }

    return (
        <div style={{marginTop: '50px'}}>
            <div className="profileNav">
                {tabs.map(tab =>
                    <div
                        key={tab.id}
                        onClick={e => makeActive(e, tab.id)}
                        className={tab.id === 1 ? "profileNav__item active" : "profileNav__item"}
                    >
                        {tab.name}
                    </div>
                )}
            </div>
            <div className='profileSettings'>
                {activeTab}
            </div>
        </div>
    );
};

export default Admin;