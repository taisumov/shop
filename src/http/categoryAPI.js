import {$authHost, $host} from "./index";

export const getCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const getCategoryByID = async (id) => {
    const {data} = await $host.get(`api/category/${id}`)
    return data
}

export const createCategory = async (category) => {
    const {res} = await $host.post('api/category', {name: category})
    return res
}

export const deleteCategory = async (id) => {
    const {res} = await $host.post('api/category/delete', {id})
    return res
}