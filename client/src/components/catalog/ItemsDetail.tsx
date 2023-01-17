import ItemDetail from './ItemDetail'
import React from "react";

// Types
import { Machine } from '../../types'

interface Props {
    items: Machine[],
    editMode: boolean,
    saveItemChange: () => void
}

const ItemsDetail: React.FC<Props> = props => {

    const { items, editMode, saveItemChange } = props
    const onItemChange = () => {
        saveItemChange();
    }

    return (
        <div className="w-100">
        <>
            {items.map((item: Machine, index: number) => (
              <ItemDetail key={index} item={item} editMode={editMode} onItemChange={onItemChange} />
            ))}
        </>
        </div>
    )
}

export default ItemsDetail
