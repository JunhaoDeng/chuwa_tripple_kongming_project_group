import React, { useEffect } from 'react';
import styles from '../../styles/Products.module.css';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { AsyncSetProductDataType, productsAsyncSetProductList } from '../../redux/slice';
import { HOST } from '../../config';
import { jwtDecode } from 'jwt-decode';

type ProductBoardPropsType = {
    current_page: number;
}
const ProductsBoard = (props: ProductBoardPropsType) => {
    // 10 items per page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product_list: any = useSelector((state: RootState) => state.products.product_list);
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

        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        };

        const indata: AsyncSetProductDataType = {
            products_url: `${HOST}/api/products`,
            cart_url: `${HOST}/api/users/${decoded.id}/cart`,
            options: options
        };

        dispatch(productsAsyncSetProductList(indata))
    }, [])
    
    return (
            <div className={styles.productsBoard}>
                {product_list.slice((props.current_page - 1) * 10, Math.min((props.current_page - 1) * 10 + 10, product_list.length)).map(
                    (_, index: number) => <ProductCard index={(props.current_page - 1) * 10 + index} key={index}/>
                )}
            </div>
    )
}

export default ProductsBoard;