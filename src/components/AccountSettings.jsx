import React, {useContext, useState} from 'react';
import Input from "../ui/input/Input";
import cl from '../compstyles/AccountSettings.module.css'
import Button from "../ui/button/Button";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getCurrentUser} from "../utils/getCurrentUser";
import {update} from "../http/userAPI";
import jwt_decode from "jwt-decode";
import FileUpload from "../ui/fileupload/FileUpload";

const AccountSettings = observer(() => {

    const [input, setInput] = useState("")

    const {user} = useContext(Context)

    const [currentUser, setCurrentUser] = useState(getCurrentUser())

    const [email, setEmail] = useState(currentUser.email || "")
    const [name, setName] = useState(currentUser.name || "")
    const [surname, setSurname] = useState(currentUser.surname || "")
    const [avatarUpdate, setAvatarUpdate] = useState([])

    const updateUser = async () => {
        try {
            const formData = new FormData()
            formData.append('avatarUpdate', avatarUpdate[0], avatarUpdate[0].name)
            formData.append('eMail', currentUser.email)
            formData.append('newEmail', email)
            formData.append('newName', name)
            formData.append('newSurname', surname)
            setCurrentUser({
                ...currentUser
            })
            let data;
            data = await update(formData)
                .then((e) => {
                    console.log("ALL OK!!!")
                    user.setUser(jwt_decode(data))
                    user.setIsAuth(true)
                })
                .catch((e) => {
                    console.log(e)
                })
            user.setUser(jwt_decode(data))
            user.setIsAuth(true)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className={cl.AccountSettings}>
            <h2>Аккаунт</h2>
            <div className={cl.container}>
                <div className={cl.textInputs}>
                    <Input id={1} value={email} callback={setEmail} name={"Почта"} type={"text"} button={null}/>
                    <Input id={2} value={name} callback={setName} name={"Имя"} type={"text"} button={null}/>
                    <Input id={3} value={surname} callback={setSurname} name={"Фамилия"} type={"text"} button={null}/>
                </div>
                <div className={cl.uploadAvatar}>
                    <FileUpload
                        state={avatarUpdate}
                        callback={file => setAvatarUpdate([...avatarUpdate, file])}
                    />
                </div>
            </div>
            <Button
                click={updateUser}
            >
                Сохранить
            </Button>
        </div>
    );
});

export default AccountSettings;