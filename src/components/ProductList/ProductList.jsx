import React, { useState } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from '../hooks/useTelegram';

const products = [
    {id: '1', title: 'Jeanse', price: 50, description: 'Blue, skin'},
    {id: '2', title: 'Jacket', price: 500, description: 'Green, warm'},
    {id: '3', title: 'Short', price: 60, description: 'Blue, skin'},
    {id: '4', title: 'T-Short', price: 30, description: 'Blue, skin'},
    {id: '5', title: 'Pans', price: 20, description: 'Green, warm'},
    {id: '6', title: 'Hat', price: 80, description: 'Blue, skin'},
    {id: '7', title: 'Sneakers', price: 100, description: 'Blue, skin'},
    {id: '8', title: 'Suite', price: 450, description: 'Green, warm'}
]

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0);
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);

        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if(newItems === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.setParams({
                text: `${getTotalPrice(newItems)}` 
            })
        }
    }

    return(
        <div className={'list'}>
            {products.map(item => {
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            })}
        </div>
    );
}

export default ProductList;