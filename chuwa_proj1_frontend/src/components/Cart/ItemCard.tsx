import React from 'react';
import responsiveStyles from '../../styles/Adjustor.module.css';
import { Button, Card, Flex } from 'antd';

import QuantitiController from '../QuantityController'

const ProductDetail: React.FC = () => {
    return (
        <div>
            <Card style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden', height: '100%' } }}>
                <Flex gap={"1rem"}>
                    <img
                        alt="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        style={imgStyle}
                    />
                    <Flex vertical flex={'1 1 0'} justify='space-between'>
                        <Flex className={responsiveStyles.responsiveWrap} justify='space-between'>
                            <p style={{ fontSize: 'larger', fontWeight: '600'}}>Meta Quest2 VR</p>
                            <p style={{ fontSize: 'larger', fontWeight: '500', color:'#5048E5'}}>$299.00</p>
                        </Flex>
                        <Flex style={{ width: '100%', marginTop: '1rem' }} gap="small" align='center' justify='space-between' vertical={false} >
                            <QuantitiController />
                            <Button style={{textDecoration: 'underline', color:'#535353'}} type='text' size='small'>Remove</Button>
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