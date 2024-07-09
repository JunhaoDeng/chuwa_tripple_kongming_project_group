import React, { useEffect } from 'react';
import btnStyles from '../../styles/Btn.module.css';
import { Input, Button, Flex, Divider, Space } from 'antd';

import ProductCardInCart from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCart } from '../../redux/slice';

const ProductDetail: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const subtotal = useSelector((state: RootState) => state.cart.subtotal);
    const cartStatus = useSelector((state: RootState) => state.cart.status);
    const error = useSelector((state: RootState) => state.cart.error);


    useEffect(() => {
        if (cartStatus === 'idle') {
            dispatch(fetchCart());
        }
    }, [cartStatus, dispatch]);

    console.log(cartStatus);
    if (cartStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (cartStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {
                cartItems.map((item, index) => <ProductCardInCart
                    key={index}
                    productId={item.productId}
                    name={item.name}
                    price_cent={item.price_cent}
                    img_link={item.img_link}
                    quantity={item.quantity}
                    index={index}
                />)
            }
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <p>Apply Discount Code</p>
                <Flex gap='middle'>
                    <Input placeholder='20 DOLLAR OFF'></Input>
                    <Button className={btnStyles.uniformPrimaryBtn}>Apply</Button>
                </Flex>
                <Divider />
            </Space>
            <Space direction="vertical" size="middle" style={{ display: 'flex', padding: '0.3rem' }}>
                <p>Apply Discount Code</p>
                <Flex gap='large' justify='space-between'>
                    <span>Subtotal</span>
                    <span>${(subtotal / 100).toFixed(2)}</span>
                </Flex>
                <Flex gap='large' justify='space-between'>
                    <span>Tax</span>
                    <span>${(subtotal / 1000).toFixed(2)}</span>
                </Flex>
                <Flex gap='large' justify='space-between'>
                    <span>Discount</span>
                    <span>-$20.00</span>
                </Flex>
                <Flex gap='large' justify='space-between'>
                    <span>Estimated total</span>
                    <span>${((subtotal + subtotal / 10) / 100 - 20).toFixed(2)}</span>
                </Flex>
                <Button className={btnStyles.uniformPrimaryBtn} block={true}>Continue to Checkout</Button>
            </Space>
        </>
    )
}

export default ProductDetail;