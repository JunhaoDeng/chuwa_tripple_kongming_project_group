import styles from '../../styles/Products.module.css';
import btnStyles from '../../styles/Btn.module.css';
import '../../styles/Products.module.css'
import { Card, Button, Flex } from 'antd';
import QuantitiController from '../QuantityController';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { ASThunkDatatype, productAsyncSetNumAdded } from '../../redux/slice';
import { jwtDecode } from 'jwt-decode';
import { HOST } from '../../config';
import { Root } from 'react-dom/client';
import { useEffect, useState } from 'react';
import create from '@ant-design/icons/lib/components/IconFont';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const { Meta } = Card;

type ItemCardPropsType = {
  index: number // the index where this item locate in the state.products.product_list
}

type TokenType = {
  id: string,
  email: string,
  iat: number
}

const ItemCard = (props: ItemCardPropsType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const product: any = useSelector((state: RootState) => state.products.product_list[props.index]);
  const created_by: any = useSelector((state: RootState) => state.products2.created_by[props.index]);

  const [tokenDec, setTokenDec] = useState<TokenType>({id: "", email: "", iat: 0});

  const quantitySelector = (state: RootState) => state.products.product_list[props.index].num_added;
  const productIdSelector = (state: RootState) => state.products.product_list[props.index].id;

  const dispatch: AppDispatch = useDispatch();

  const navigate: NavigateFunction = useNavigate();
  
  useEffect(() => {
    let decoded: any = null;
    try {
        decoded = jwtDecode(sessionStorage.getItem("token") as string);
    } catch(err) {
        return;
    }
    setTokenDec(decoded);
  }, []);
  const handleAddClicked = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    
    // console.log(decoded);

    const postbody = {
        quantity: product.num_added + 1
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
        url: `${HOST}/api/users/${tokenDec.id}/cart/${product.id}`,
        product_id: product.id,
        options: options,
        isAdd: true
    };

    dispatch(productAsyncSetNumAdded(thunkdata));
  }

  const handleItemClicked = () => {
    navigate(`/products/${product.id}/detail`);
  }
  ///products/:productId/edit
  const handleEditClicked = () => {
    navigate(`/products/${product.id}/edit`);
  }
  return <Card
    className={styles.productCard}
    hoverable
    styles={{body: {padding: '0.5rem'}}}
    cover={<img alt="example" src={ product.image_link } onClick={ handleItemClicked }/>}
    actions={[
      <Flex gap="small" justify="space-around" wrap>
        { product.num_added === 0 && <Button className={btnStyles.uniformPrimaryBtn} style={{flexGrow: 1}} size='small'
        onClick={ handleAddClicked }>Add</Button>}
        { product.num_added !== 0 && <QuantitiController quantitySelectorFunc={ quantitySelector } 
                                    productIdSelectorFunc={ productIdSelector } setQuantityAction={ productAsyncSetNumAdded } />}
        {/* <QuantitiController /> */}
        {/* { JSON.stringify(tokenDec) }
        { JSON.stringify(created_by.type) } */}
        { (tokenDec.id === created_by._id) && <Button style={{flexGrow: 1}} size='small' onClick={ handleEditClicked }>Edit</Button>}
      </Flex>
    ]}
  >
    <Meta
      title={<p className={styles.productCardTitle}>{ product.name }</p>}
      description={<p className={styles.productCardPrice}>{ (product.price / 100).toFixed(2) }</p>}
    />
  </Card>
};
export default ItemCard;