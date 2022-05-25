import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE} from "../utils/consts";
import defaultAvatar from '../static/img/defaultAvatar.svg'
import {toJS} from "mobx";
import jwt_decode from "jwt-decode";
import AccountSettings from "./AccountSettings";
import Orders from "./Orders";
import Addresses from "./Addresses";

const Profile = observer(() => {

    let navigate = useNavigate()
    const {user} = useContext(Context)
    if (!user.isAuth) {
        navigate('/auth')
    }

    const [userData, setUserData] = useState(jwt_decode(localStorage.getItem('token')))
    const [activeTab, setActiveTab] = useState(<AccountSettings/>)

    const [tabs, setTabs] = useState([
        {id: 1, name: 'Аккаунт'},
        {id: 2, name: 'Заказы'},
        {id: 3, name: 'Адреса'},
    ])

    const makeActive = (e, id) => {

        if (id === 1) {
            setActiveTab(<AccountSettings/>)
        }
        if (id === 2) {
            setActiveTab(<Orders/>)
        }
        if (id === 3) {
            setActiveTab(<Addresses/>)
        }

        Array.from(document.getElementsByClassName("profileNav__item")).map(item => {
            item.className = "profileNav__item"
        })
        e.target.className = e.target.className === "profileNav__item" ? "profileNav__item active" : "profileNav__item"
    }

    return (
        <div className='profile'>
            <div className='profileHeader'>
                <div className="userBasicInfo">
                    <div className="userAvatar">
                        <img src={userData.avatar ? `${process.env.REACT_APP_API_URL}/${userData.avatar}` : defaultAvatar} alt=""/>
                    </div>
                    <div className="userName">
                        <h3>
                            {userData.name
                                ? `${userData.name} ${userData.surname}`
                                : userData.email
                            }
                        </h3>
                    </div>
                    <div className="userMail">
                        {userData.email}
                    </div>
                </div>
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
            </div>
            <div className='profileSettings'>
                {activeTab}
            </div>
        </div>
    );
});

export default Profile;