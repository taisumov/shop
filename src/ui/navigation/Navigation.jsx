import React, {useEffect, useState} from 'react';
import '../../App.css'
import classes from './Navigation.module.css'
import {classNames} from "../../utils/utils";
import {Link} from "react-router-dom";
import Error from "../../components/Error";
import SearchMini from "../search_mini/SearchMini";
import DropdownLink from "./dropdownLink/DropdownLink";
import ProfileImage from "../../static/img/profile.svg"
import SearchImage from "../../static/img/search.svg"
import CartImage from "../../static/img/shopping_cart.svg"
import userIcon from '../../static/img/userIcon.svg'
import logout from '../../static/img/logout.svg'
import BurgerMenu from "./burgerMenu/BurgerMenu";
import {useMobile} from "../../hooks/useMobile";
import MainPage from "../../components/MainPage";
import AuthForm from "../../components/AuthForm";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../../index";
import {AUTH_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import Profile from "../../components/Profile";
import Search from "../../components/Search";

const Navigation = observer(({basketIsOpen, setBasketIsOpen}) => {
    const {user} = useContext(Context)
    const [isBurgerOpen, setIsBurgerOpen] = useState(false)
    const isMobile = useMobile(removeScrollBar, 900)
    const [dropdownItems, setDropdownItems] = useState([
        {value: 'Главная', icon: null, to: <Error/>},
        {value: 'Магазин', icon: null, to: <AuthForm/>},
        {value: 'О нас', icon: null, to: <Error/>},
        {value: 'Блог', icon: null, to: <Error/>},
        {value: 'Помощь', icon: null, to: <Error/>},
        {value: 'Контакты', icon: null, to: <Error/>},
        {value: 'Поиск', icon: null, to: <Error/>},
    ])

    function removeScrollBar() {
        if (window.matchMedia("(min-width: 900px)").matches)
            document.body.style.overflowY = 'auto'
    }

    const burgerClickHandler = () => {
        document.body.style.overflowY = !isBurgerOpen ? 'hidden' : 'auto'
        setIsBurgerOpen(!isBurgerOpen)
    }

    const logOut = () => {
        burgerClickHandler()
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <div className={isMobile && isBurgerOpen ? classes.openNavBar : ''}>
            <nav className={classes.nav}>
                <Link to={'/'}>
                    <div className="nav__logo" onClick={burgerClickHandler}>
                        <svg width="150" height="27" viewBox="0 0 150 27" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.24707 0.80957H4.41699V26H0.24707V0.80957ZM14.9443 14.6523H5.81836V11.8496H14.9443V14.6523ZM16.0039 0.80957V3.91992H5.81836V0.80957H16.0039ZM24.5488 0.80957V22.8896H36.1357V26H20.3789V0.80957H24.5488ZM39.793 13.2852C39.793 11.2572 40.0322 9.46842 40.5107 7.91895C41.012 6.34668 41.6956 5.02507 42.5615 3.9541C43.4502 2.86035 44.487 2.02865 45.6719 1.45898C46.8796 0.866536 48.1898 0.52474 49.6025 0.433594V3.85156C48.8278 3.94271 48.0986 4.18197 47.415 4.56934C46.7314 4.95671 46.139 5.52637 45.6377 6.27832C45.1364 7.03027 44.7376 7.9873 44.4414 9.14941C44.1452 10.3115 43.9857 11.6901 43.9629 13.2852C43.9857 14.903 44.1452 16.293 44.4414 17.4551C44.7376 18.5944 45.1364 19.5514 45.6377 20.3262C46.1618 21.1009 46.7656 21.6934 47.4492 22.1035C48.1328 22.4909 48.8506 22.7188 49.6025 22.7871V26.1709C48.2126 26.0798 46.9137 25.7493 45.7061 25.1797C44.4984 24.5872 43.4502 23.7555 42.5615 22.6846C41.6956 21.5908 41.012 20.2578 40.5107 18.6855C40.0322 17.1133 39.793 15.3132 39.793 13.2852ZM50.9697 0.433594C52.3597 0.501953 53.6471 0.832357 54.832 1.4248C56.0397 2.01725 57.0765 2.86035 57.9424 3.9541C58.8311 5.02507 59.526 6.34668 60.0273 7.91895C60.5286 9.46842 60.7793 11.2572 60.7793 13.2852C60.7793 15.3132 60.5286 17.1133 60.0273 18.6855C59.526 20.2578 58.8311 21.5908 57.9424 22.6846C57.0765 23.7555 56.0511 24.5872 54.8662 25.1797C53.6813 25.7493 52.3825 26.0798 50.9697 26.1709V22.7871C51.7445 22.696 52.4736 22.4567 53.1572 22.0693C53.8408 21.6592 54.4333 21.0781 54.9346 20.3262C55.4359 19.5514 55.8346 18.5944 56.1309 17.4551C56.4271 16.293 56.5866 14.903 56.6094 13.2852C56.5866 11.6673 56.4271 10.2887 56.1309 9.14941C55.8346 7.9873 55.4245 7.03027 54.9004 6.27832C54.3991 5.50358 53.8066 4.92253 53.123 4.53516C52.4395 4.125 51.7217 3.88574 50.9697 3.81738V0.433594ZM74.998 22.5479L79.7832 0.80957H81.3896V9.93555L77.6641 26.1367H72.2979L65.9062 0.80957H70.5547L74.998 22.5479ZM93.6943 0.80957H98.3428L91.541 26.1367H86.209L82.791 10.585V0.80957H84.4316L88.875 22.5479L93.6943 0.80957ZM106.785 23.6758C106.785 24.3594 106.546 24.9404 106.067 25.4189C105.589 25.8975 105.008 26.1367 104.324 26.1367C103.641 26.1367 103.06 25.8975 102.581 25.4189C102.125 24.9404 101.897 24.3594 101.897 23.6758C101.897 22.9922 102.137 22.4225 102.615 21.9668C103.094 21.4883 103.663 21.249 104.324 21.249C105.008 21.249 105.589 21.4883 106.067 21.9668C106.546 22.4225 106.785 22.9922 106.785 23.6758Z"
                                fill="#323232"/>
                            <path
                                d="M111.092 0.80957H115.262V26H111.092V0.80957ZM125.789 14.6523H116.663V11.8496H125.789V14.6523ZM116.663 22.8896H126.849V26H116.663V22.8896ZM126.849 0.80957V3.91992H116.663V0.80957H126.849ZM132.386 0.80957H136.487V26H132.386V0.80957ZM149.476 26H145.135L140.384 16.874C140.315 16.874 140.236 16.8854 140.145 16.9082C140.076 16.9082 139.962 16.9082 139.803 16.9082C139.643 16.9082 139.404 16.9082 139.085 16.9082C138.789 16.9082 138.39 16.9082 137.889 16.9082V13.9004H140.213C140.714 13.9004 141.215 13.8206 141.717 13.6611C142.218 13.4788 142.674 13.194 143.084 12.8066C143.494 12.4193 143.825 11.8838 144.075 11.2002C144.326 10.4938 144.451 9.62793 144.451 8.60254C144.451 8.19238 144.394 7.72526 144.28 7.20117C144.166 6.6543 143.927 6.1416 143.562 5.66309C143.221 5.16178 142.731 4.75163 142.093 4.43262C141.455 4.09082 140.612 3.91992 139.563 3.91992H137.889V0.80957H139.632C140.703 0.80957 141.762 0.980469 142.811 1.32227C143.859 1.66406 144.793 2.17676 145.613 2.86035C146.456 3.54395 147.129 4.37565 147.63 5.35547C148.154 6.3125 148.416 7.39486 148.416 8.60254C148.416 10.4255 147.994 11.9749 147.151 13.251C146.308 14.527 145.169 15.4727 143.733 16.0879L149.476 26Z"
                                fill="#A18A68"/>
                        </svg>
                    </div>
                </Link>
                <div className={classes.nav_links}>
                    <div className={classes.links_text}>
                        <Link to={SHOP_ROUTE}>Магазин</Link>
                        <Link to={'/'}>Блог</Link>
                        <Link to={<AuthForm/>}>Справка</Link>
                    </div>
                    <div className={classes.links_icon}>
                        <Link to={SEARCH_ROUTE}>
                            <img src={SearchImage} alt=""/>
                        </Link>
                        <Link to={<></>} onClick={() => setBasketIsOpen(true)}>
                            <img src={CartImage} alt=""/>
                        </Link>
                        <Link to={user.isAuth ? PROFILE_ROUTE : AUTH_ROUTE}>
                            <img src={ProfileImage} alt=""/>
                        </Link>
                    </div>
                </div>
                <BurgerMenu
                    isBurgerOpen={isBurgerOpen}
                    burgerClickHandler={burgerClickHandler}
                />
            </nav>
            {isMobile &&
                <>
                    <SearchMini placeholder={"Поиск..."}/>
                    <div
                        className={isBurgerOpen ? classNames(classes.dropdown, classes.openDropdown) : classes.dropdown}
                    >
                        {dropdownItems.map((item) =>
                            <DropdownLink
                                click={burgerClickHandler}
                                key={item.value}
                                to={item.to}
                                value={item.value}
                                icon={item.icon}
                            />
                        )}
                        <hr className={classes.delimiter}/>
                        {user.isAuth
                            ?
                            <>
                                <DropdownLink
                                    click={burgerClickHandler}
                                    to={PROFILE_ROUTE}
                                    value={'Профиль'}
                                    icon={userIcon}
                                />
                                <DropdownLink
                                    click={logOut}
                                    to={AUTH_ROUTE}
                                    value={'Выйти'}
                                    icon={logout}
                                />
                            </>
                            :
                            <DropdownLink
                                click={burgerClickHandler}
                                to={AUTH_ROUTE}
                                value={'Войти'}
                                icon={logout}
                            />
                        }
                    </div>
                </>
            }

        </div>
    );
});

export default Navigation;