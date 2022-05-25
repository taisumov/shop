import jwt_decode from "jwt-decode";

export const getCurrentUser = () => {
    const user = jwt_decode(localStorage.getItem('token'))
    return user
}