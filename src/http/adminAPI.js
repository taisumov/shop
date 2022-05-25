import {$authHost, $host} from "./index";

export const getUsers = async () => {
    const {data} = await $host.get('api/admin')
    return data
}

export const deleteUser = async (email) => {
    const {data} = await $host.post('api/admin/delete', {email})
    return {data}
}