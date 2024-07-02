import React from 'react';
import styles from '../../styles/Products.module.css';

// const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };
import { Button, Card, Flex, Typography } from 'antd';

const cardStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    padding: "2rem",
    border: '0',
    borderRadius: "0px",
    alignItems: 'center'
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: "50%",
    borderRadius: '0',
    alignSelf: 'center'
};


const { Title, Paragraph, Text, Link } = Typography;



const ProductDetail: React.FC = () => {

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Products Detail</h1>
            </div>
            {/* <div className={styles.productsBoard}> */}
            <Card style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden', height: '100%' } }}>
                <Flex justify="space-between" style={{ height: '100%' }}>
                    <img
                        alt="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        style={imgStyle}
                    />
                    <Flex vertical align="flex-start" style={{ padding: '2rem 3rem' }}>
                        <Typography>
                            <Text>Category1</Text>
                            <Title style={{margin: 0}} level={2}>Meta Quest2 VR headset</Title>
                            <Title style={{margin: '1rem 0'}} level={2}>$299</Title>
                            <Paragraph>
                                In the process of internal desktop applications development, many different design specs and
                                implementations would be involved, which might cause designers and developers difficulties and
                                duplication and reduce the efficiency of development.
                            </Paragraph>
                        </Typography>
                        <Flex style={{width: '70%', marginTop: '1rem'}} gap="small" wrap>
                            <Button style={{ flex: '1 1 0' }} type="primary">Add To Cart</Button>
                            <Button style={{ flex: '1 1 0' }}>Edit</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
            {/* </div> */}

        </div>
    )
}

export default ProductDetail;