import React from 'react';
import cl from './Footer.module.css'
import Error from "../../components/Error";
import {Link} from "react-router-dom";
import Input from "../input/Input";
import arrowRight from '../../static/img/arrowRight.svg'
import LinkedInIcon from '../../static/img/linkedin.svg'
import InstagramIcon from '../../static/img/instagram.svg'
import TwitterIcon from '../../static/img/twitter.svg'
import FacebookIcon from '../../static/img/facebook.svg'
import {useState} from "react";

const Footer = () => {

    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 900px)").matches)

    const mediaHandler = e => setIsMobile(e.matches)

    window.matchMedia("(max-width: 900px)").addEventListener('change', mediaHandler);

    return (
        <div className={cl.footer}>
            <div className={cl.topLine}>
                <div className={cl.footerLinks}>
                    <Link to={<Error/>}>
                        Контакты
                    </Link>
                    <Link to={<Error/>}>
                        Условия
                    </Link>
                    <Link to={<Error/>}>
                        Доставка
                    </Link>
                </div>
                <div className={cl.footerInput}>
                    <Input
                        type={'text'}
                        name={'Узнайте о новостях'}
                        id={'footerInput'}
                        button={{
                            icon: arrowRight,
                            callback: () => {}
                        }}
                    />
                </div>
            </div>
            <div className={cl.bottomLine}>
                <div className={cl.about}>
                    @2022 Flow.er. Все права защищены.
                </div>
                <div className={cl.linksIcon}>
                    {isMobile &&
                        <span>Подпишись:</span>
                    }
                    <Link to={<Error/>} className={cl.linkFooterIcon}>
                        <img src={LinkedInIcon} alt=""/>
                    </Link>
                    <Link to={<Error/>} className={cl.linkFooterIcon}>
                        <img src={InstagramIcon} alt=""/>
                    </Link>
                    <Link to={<Error/>} className={cl.linkFooterIcon}>
                        <img src={TwitterIcon} alt=""/>
                    </Link>
                    <Link to={<Error/>} className={cl.linkFooterIcon}>
                        <img src={FacebookIcon} alt=""/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;