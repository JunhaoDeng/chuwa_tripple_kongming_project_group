import React from 'react';
import btnStyles from '../../styles/Btn.module.css';
import { Input, Button, Flex, Divider, Space } from 'antd';

import ProductCardInCart from './ItemCard'

const ProductDetail: React.FC = () => {

    return (
        <>
            <ProductCardInCart />
            <ProductCardInCart />
            <ProductCardInCart />
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
                    <span>$499.00</span>
                </Flex>
                <Flex gap='large' justify='space-between'>
                    <span>Tax</span>
                    <span>$49.90</span>
                </Flex>
                <Flex gap='large' justify='space-between'>
                    <span>Discount</span>
                    <span>-$20.00</span>
                </Flex>
                <Flex gap='large' justify='space-between'>
                    <span>Estimated total</span>
                    <span>$429.10</span>
                </Flex>
                <Button className={btnStyles.uniformPrimaryBtn} block={true}>Continue to Checkout</Button>
            </Space>
        </>
    )
}

export default ProductDetail;