import CatalogItem from './CatalogItem'
import React from "react";

// Types
import { Machine } from '../../types'

interface Props {
    items: Machine[]
}

const CatalogItems: React.FC<Props> = props => {
    const { items } = props
    return (
        <div className="catalog-items-wrapper">
            {items.map((item: Machine, index: number) => (
                <CatalogItem key={index} item={item} />
            ))}
        </div>

    )
}

export default CatalogItems
