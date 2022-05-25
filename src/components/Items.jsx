import React, {useState} from 'react';
import Button from "../ui/button/Button";
import ModalAddItem from "../ui/modalAddItem/ModalAddItem";

const Items = () => {

    const [addingItem, setAddingItem] = useState(false)

    return (
        <div>
            {addingItem &&
                <ModalAddItem close={() => setAddingItem(false)}/>
            }
            <Button click={() => setAddingItem(true)}>Добавить товар</Button>
        </div>
    );
};

export default Items;