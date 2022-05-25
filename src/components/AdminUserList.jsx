import React, {useEffect, useState} from 'react';
import {getItemByID} from "../http/itemsAPI";
import {deleteUser, getUsers} from "../http/adminAPI";
import UserItem from "../ui/userItem/UserItem";
import Input from "../ui/input/Input";

const AdminUserList = () => {

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState(users)
    const [filter, setFilter] = useState([])

    const refreshUsers = () => {
        getUsers().then((data) => {
            setUsers(data)
            setFilteredUsers(data)

        }).catch(e => alert(e)).finally(() => console.log(users))
    }

    useEffect(refreshUsers, [])

    useEffect(() => {
        if (filter !== ''){
            setFilteredUsers(users.filter((user) =>
                user.email.toLowerCase().includes(filter.toLowerCase()) ||
                user.name.toLowerCase().includes(filter.toLowerCase()) ||
                user.surname.toLowerCase().includes(filter.toLowerCase())))
        }
    }, [filter])

    const delUser = async (email) => {
        await deleteUser(email)
        refreshUsers()
    }

    return (<div className={'adminUsers'}>
            <div className={'adminSearchUsers'}>
                <Input
                    value={filter}
                    callback={setFilter}
                    type={'text'}
                    id={1}
                    button={null}
                    name={'Поиск...'}
                />
            </div>
            <div className={'adminUserListContainer'}>
                <div className={'adminUserList'}>
                    {filteredUsers.map(user => <UserItem key={user.id} user={user} callback={delUser}/>)}
                </div>
            </div>
        </div>);
};

export default AdminUserList;