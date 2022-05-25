import React, {useContext, useState} from 'react';
import TextSwitcher from "../ui/text_switcher/TextSwitcher";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from 'react-router-dom';
import {SHOP_ROUTE} from "../utils/consts";

const AuthForm = observer(() => {

    const {user} = useContext(Context)
    let navigate = useNavigate();

    const [typeAuth,setTypeAuth] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {

        let data = null;

        try {

            if(typeAuth === 'login') {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            console.log(data, 1)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
        if(data) {
            user.setUser(data)
            user.setIsAuth(true)
        }
    }

    return (
        <div className='auth-form'>
            <h2>Мой аккаунт</h2>
            <div className='auth-form-container'>
                <TextSwitcher firstSwitch={'Вход'} secondSwitch={'Регистрация'} setTypeAuth={setTypeAuth} typeAuth={typeAuth}/>
                <Input
                    value={email}
                    callback={setEmail}
                    type={'email'}
                    name={'Почта'}
                    id={'1'}
                    button={null}
                />
                <Input
                    value={password}
                    callback={setPassword}
                    value={password}
                    type={'password'}
                    name={'Пароль'}
                    id={'2'}
                    button={null}
                />
                {typeAuth === 'registration' &&
                    <Input
                        type={'password'}
                        name={'Повторите пароль'}
                        id={'3'}
                        button={null}
                    />
                }
                <Button
                    click={click}
                >
                    {typeAuth === 'login' ? "Войти" : "Зарегистрироваться"}
                </Button>
            </div>
        </div>
    );
});

export default AuthForm;