import React, { useEffect } from "react";
import styles from "../../styles/Products.module.css";
import btnStyles from "../../styles/Btn.module.css";
import responsiveStyles from "../../styles/Adjustor.module.css";
import { useParams } from "react-router-dom";
// const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };
import { Button, Card, Flex, Typography } from 'antd';
import { HOST } from '../../config';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { ASThunkDatatype, productDetailAsyncSetNumAdded, productDetailSetCategory, productDetailSetDescription, productDetailSetId, productDetailSetImageLink, productDetailSetName, productDetailSetNumAdded, productDetailSetPrice } from '../../redux/slice';
import QuantitiController from '../../components/QuantityController';


const cardStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  padding: "2rem",
  border: "0",
  borderRadius: "0px",
  alignItems: "center",
};

const imgStyle: React.CSSProperties = {
  display: "block",
  width: "50%",
  borderRadius: "0",
  alignSelf: "center",
};

const { Title, Paragraph, Text } = Typography;

const ProductDetailPage: React.FC = () => {
  // const { product_id } = useParams();
  const params_product_id = "668b578c4cbb11b551187d55";


    const quantitySelector = (state: RootState) => state.product_detail.num_added;
    const productIdSelector = (state: RootState) => state.product_detail.id;
    const product_id: string = useSelector(productIdSelector);
    const name: string = useSelector((state: RootState) => state.product_detail.name);
    const price: number = useSelector((state: RootState) => state.product_detail.price);
    const num_added: number = useSelector(quantitySelector);
    const image_link: string = useSelector((state: RootState) => state.product_detail.image_link);
    const description: string = useSelector((state: RootState) => state.product_detail.description);
    const category: string = useSelector((state: RootState) => state.product_detail.category);

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let decoded: any = null;
        try {
            decoded = jwtDecode(sessionStorage.getItem("token") as string);
        } catch(err) {
            alert("Token invalid or missing");
            return;
        }
        console.log(decoded);
        
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        fetch(`${HOST}/api/users/${decoded.id}/product/${params_product_id}`, options) // get the product detail
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(productDetailSetId(data._id));
            dispatch(productDetailSetName(data.name));
            dispatch(productDetailSetPrice(Number(data.price_cent)));
            dispatch(productDetailSetImageLink(data.img_link));
            dispatch(productDetailSetDescription(data.description));
            dispatch(productDetailSetCategory(data.category))
            const options = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            }; 
            return fetch(`${HOST}/api/users/${decoded.id}/cart`, options); // get the cart to see how many of such product is in the cart
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let prod_idx = -1, quantity_added = 0;
            for (let i = 0; i < data.length; ++i) {
                if (data[i].productId === params_product_id) {
                    quantity_added = data[i].quantity;
                    prod_idx = i;
                }
            }
            dispatch(productDetailSetNumAdded(Number(quantity_added)));
        })
    }, []);

    const handleAddProduct = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let decoded: any = null;
        try {
            decoded = jwtDecode(sessionStorage.getItem("token") as string);
        } catch(err) {
            alert("Token invalid or missing");
            return;
        }
        // console.log(decoded);

        const postbody = {
            quantity: num_added + 1
        };

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postbody)
        };

        const thunkdata: ASThunkDatatype = {
            url: `${HOST}/api/users/${decoded.id}/cart/${product_id}`,
            product_id: product_id,
            options: options
        };

        dispatch(productDetailAsyncSetNumAdded(thunkdata));
    }
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Products Detail</h1>
            </div>
            {/* <div className={styles.productsBoard}> */}
            <Card style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden', height: '100%' } }}>
                <Flex className={responsiveStyles.responsiveWrap} justify="space-between" style={{ height: '100%' }} gap='large'>
                    <img
                        alt="avatar"
                        src={ image_link }
                        style={imgStyle}
                    />
                    <Flex vertical align="flex-start" >
                        <Typography>
                            <Text>{ category }</Text>
                            <Title style={{margin: 0}} level={2}>{ name }</Title>
                            <Title style={{margin: '1rem 0'}} level={2}>${(price / 100).toFixed(2)}</Title>
                            <Paragraph>
                                { description }
                            </Paragraph>
                        </Typography>
                        <Flex style={{width: '70%', marginTop: '1rem'}} gap="small">
                            {num_added === 0 && <Button className={btnStyles.uniformPrimaryBtn} style={{ flex: '1 1 0' }} type="primary" onClick={ handleAddProduct }>Add To Cart</Button>}
                            {num_added !== 0 && <QuantitiController quantitySelectorFunc={ quantitySelector } 
                                    productIdSelectorFunc={productIdSelector} setQuantityAction={ productDetailAsyncSetNumAdded } />}
                            <Button style={{ flex: '1 1 0' }}>Edit</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
            {/* </div> */}
    </div>
  );
};

export default ProductDetailPage;
