import React, {useEffect, useState} from 'react';
import cl from './ModalAddItem.module.css'
import Button from "../button/Button";
import Input from "../input/Input";
import FileUpload from "../fileupload/FileUpload";
import slug from 'slug'
import Select from "react-select";
import {createItem} from "../../http/itemsAPI";
import {getCategories} from "../../http/categoryAPI";

const ModalAddItem = ({close}) => {

    const defaultValue = {value: '', label: 'Выберите категорию...'}

    // const categories = [
    //     { value: '1', label: 'Розы' },
    //     { value: '2', label: 'Тюльпаны' },
    // ];

    const [options, setOptions] = useState([])

    const [name, setName] = useState('')
    const [slugName, setSlugName] = useState('')
    const [description, setDescription] = useState('')
    const [size, setSize] = useState('')
    const [region, setRegion] = useState('')
    const [price, setPrice] = useState(0)
    //const [settings, setSettings] = useState([])
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [files1, setFiles1] = useState([])
    const [files2, setFiles2] = useState([])
    const [files3, setFiles3] = useState([])

    useEffect(() => {
        getCategories().then(data => setOptions(data))
    }, [])

    useEffect(() => {
        setCategories(options.map(option => {return {value: option.id, label: option.name}}))
    }, [options])

    const addItem = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('title', slugName)
        formData.append('price', `${price}`)
        formData.append('categoryId', category)
        formData.append('description', description)
        formData.append('region', region)
        formData.append('size', size)

        if (files1 !== []) formData.append('images', files1[0], files1[0].name)
        if (files2 !== []) formData.append('images', files2[0], files2[0].name)
        if (files3 !== []) formData.append('images', files3[0], files3[0].name)
        createItem(formData).then(data => console.log(data)).catch(e => console.log(e))
        close()
    }

    // const makeSetting = () => {
    //     setSettings([...settings, {title: '', description: '', id: Date.now()}])
    // }
    //
    // const removeInfo = (id) => {
    //     setSettings(settings.filter(i => i.id !== id))
    // }
    //
    // const changeInfo = (key, value, id) => {
    //     setSettings(settings.map(i => i.id === id ? {...i, [key]: value} : i))
    // }

    useEffect(() => {
        setSlugName(slug(name))
    }, [name])

    return (
        <div className={cl.modal} onClick={(e) => {
            if (e.target.classList.contains(cl.modal)) {
                close()
            }
        }}>
            <div className={cl.modalContainer}>
                <h3>Новый товар</h3>
                <div className={cl.inputContainer}>
                    <div className={cl.forSelect}>
                        <Select
                            options={categories}
                            defaultValue={defaultValue}
                            onChange={e => setCategory(e.value)}
                        />
                    </div>
                    <Input name={'Название'} value={name} callback={setName} button={null} id={1} type={'text'}/>
                    <Input name={'Код'} value={slugName} button={null} id={2} type={'text'}/>
                    <Input name={'Цена'} value={price} callback={setPrice} button={null} id={3} type={'number'}/>
                    <Input name={'Страна'} value={region} callback={setRegion} button={null} id={4} type={'text'}/>
                    <Input name={'Размер'} value={size} callback={setSize} button={null} id={5} type={'text'}/>
                    <Input name={'Описание'} value={description} callback={setDescription} button={null} id={6} type={'text'}/>

                    {/*<div className={cl.additional}>*/}
                    {/*    {settings.map(setting =>*/}
                    {/*        <div className={cl.inputSetting} key={setting.id}>*/}
                    {/*            <Input name={'Характеристика'}*/}
                    {/*                   button={null}*/}
                    {/*                   value={setting.title}*/}
                    {/*                   alternCallback={e => changeInfo('title', e.target.value, setting.id)}*/}
                    {/*                   id={'title'}*/}
                    {/*                   type={'text'}*/}
                    {/*            />*/}
                    {/*            <Input name={'Описание'}*/}
                    {/*                   button={null}*/}
                    {/*                   value={setting.description}*/}
                    {/*                   alternCallback={e => changeInfo('description', e.target.value, setting.id)}*/}
                    {/*                   id={'description'}*/}
                    {/*                   type={'text'}*/}
                    {/*            />*/}
                    {/*            <Button color={'light'} click={() => removeInfo(setting.id)}>Удалить</Button>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*    <Button color={'light'} click={makeSetting}>Добавить характеристику</Button>*/}
                    {/*</div>*/}

                    <div className={cl.images}>
                        <FileUpload state={files1} callback={file => setFiles1([...files1, file])}/>
                        <FileUpload state={files2} callback={file => setFiles2([...files2, file])}/>
                        <FileUpload state={files3} callback={file => setFiles3([...files3, file])}/>
                    </div>
                </div>
                <div className={cl.btnContainer}>
                    <Button click={close}>Закрыть</Button>
                    <Button
                        color={'light'}
                        click={addItem}
                    >
                        Создать
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddItem;