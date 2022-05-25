import {$host} from "./index"

export const getItemByID = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}

export const getItems = async () => {
    const {data} = await $host.get('api/item/')
    return data
}

export const createItem = async (data) => {
    const {res} = await $host.post('api/item/', data, {
        headers: {
            "Content-Type": "multiple/form-data"
        }
    })
    return res
}

export const getRating = async (userId, itemId) => {
    const {data} = await $host.post('api/item/rating', {userId, itemId})
    return data
}

export const getRecs = async (id) => {
    const {data} = await $host.get('api/recs/' + id)
    return data
}