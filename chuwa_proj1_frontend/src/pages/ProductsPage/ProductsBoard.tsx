import React from 'react';
import styles from '../../styles/Products.module.css';
import ProductCard from '../../components/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type ProductBoardPropsType = {
    current_page: number;
}
const ProductsBoard = (props: ProductBoardPropsType) => {
    // 10 items per page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product_list: any = useSelector((state: RootState) => state.products.product_list);

    return (
            <div className={styles.productsBoard}>
                {product_list.slice(props.current_page * 10, Math.min(props.current_page * 10 + 10, product_list.length)).map(
                    (_, index: number) => <ProductCard index={props.current_page * 10 + index} key={index}/>
                )}
            </div>
    )
}

export default ProductsBoard;