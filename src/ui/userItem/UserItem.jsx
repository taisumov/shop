import React from 'react';
import cl from './UserItem.module.css'
import defaultAvatar from '../../static/img/defaultAvatar.svg'
import Button from "../button/Button";

const UserItem = ({user, callback}) => {
    return (
        <>
            <div className={cl.userItem}>
                <div className={cl.userAvatar}>
                    <img src={(user.avatar) ? `${process.env.REACT_APP_API_URL}${user.avatar}` : defaultAvatar} alt=""/>
                </div>
                <div className={cl.userInfo}>
                    <div>
                        <h4 style={{margin: 0}}>
                            {user.name
                                ? `${user.name} ${user.surname}`
                                : user.email
                            }
                        </h4>
                    </div>
                    <div>
                        {user.email}
                    </div>
                    <div>
                        Роль: {user.role.toLowerCase()}
                    </div>
                </div>
            </div>
            <Button click={() => callback(user.email)} color={'light'}>Удалить</Button>
        </>
    );
};

export default UserItem;