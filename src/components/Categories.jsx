import React, {useEffect, useState} from 'react';
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import cross from '../static/img/cross.svg'
import {createCategory, deleteCategory, getCategories} from "../http/categoryAPI";

const Categories = () => {

    const [isAdding, setIsAdding] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [categories, setCategories] = useState([])

    const updateCategories = () => {
        getCategories().then(data => setCategories(data))
    }

    const deleting = (id) => {
        deleteCategory(id).then(data => {
            console.log(data)
            updateCategories()
        })
    }

    useEffect(() => {
        updateCategories()
    }, [])

    console.log(categories)

    return (
        <div className={'categoryContainer'}>
            <div>
                {isAdding &&
                    <Input value={newCategory} callback={setNewCategory} name={'Категория'} button={{icon: cross, callback: () => setIsAdding(false)}}/>
                }
                <Button click={() => {
                    setIsAdding(!isAdding)
                    if (isAdding) createCategory(newCategory).then(() => updateCategories())
                    updateCategories()
                }}>{isAdding ? 'Сохранить' : 'Добавить'}</Button>
            </div>
            <div className={'categoryList'}>
                {categories.map((c, index) =>
                    <div className={'categoryItem'}>
                        <div><h2 key={c.id}>{index + 1}. {c.name}</h2></div>
                        <div style={{padding: '0 20px'}}><Button click={() => deleting(c.id)} color={'light'}>Удалить</Button></div>
                    </div>
                )

                }
            </div>
        </div>
    );
};

export default Categories;