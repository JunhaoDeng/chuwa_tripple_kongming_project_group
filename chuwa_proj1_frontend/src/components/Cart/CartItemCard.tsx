import React from 'react';
import responsiveStyles from '../../styles/Adjustor.module.css';
import { Button, Card, Flex } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { deleteCartItem } from '../../redux/slice';
import { addOrUpdateCartItem } from '../../redux/slice';

import QuantitiController from '../QuantityController'

interface CartCardProps {
    productId: string;
    name: string;
    price_cent: number;
    img_link: string;
    quantity: number;
    index: number;
}


const ProductDetail: React.FC<CartCardProps> = ({ productId, name, price_cent, img_link, quantity, index }) => {
    const dispatch = useDispatch<AppDispatch>();
    const quantitySelector = (state: RootState) => state.cart.cartItems[index].quantity;
    const productIdSelector = (state: RootState) => state.cart.cartItems[index].productId;

    const handleDelete = () => {
        dispatch(deleteCartItem(productId));
    };

    return (
        <div>
            <Card style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden', height: '100%' } }}>
                <Flex gap={"1rem"}>
                    <img
                        alt="avatar"
                        src={img_link}
                        style={imgStyle}
                    />
                    <Flex vertical flex={'1 1 0'} justify='space-between'>
                        <Flex className={responsiveStyles.responsiveWrap} justify='space-between'>
                            <p style={{ fontSize: 'larger', fontWeight: '600' }}>{name}</p>
                            <p style={{ fontSize: 'larger', fontWeight: '500', color: '#5048E5' }}>${(price_cent / 100).toFixed(2)}</p>
                        </Flex>
                        <Flex style={{ width: '100%', marginTop: '1rem' }} gap="small" align='center' justify='space-between' vertical={false} >
                            <QuantitiController
                                quantitySelectorFunc={quantitySelector}
                                productIdSelectorFunc={productIdSelector}
                                setQuantityAction={addOrUpdateCartItem} />
                            {/* <QuantitiController 
                                productId={productId}
                                quantity={quantity}
                            /> */}
                            <Button style={{ textDecoration: 'underline', color: '#535353' }} type='text' size='small' onClick={handleDelete}>Remove</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>

        </div>
    )
}


// Style
const cardStyle: React.CSSProperties = {
    width: "100%",
    border: 'none',
    borderRadius: "0px",
    alignItems: 'center',

    marginBottom: '1.5rem'
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: "20%",
    borderRadius: '0',
    alignSelf: 'center'
};

export default ProductDetail;