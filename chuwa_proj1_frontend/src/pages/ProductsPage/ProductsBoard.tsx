import React from 'react';
import styles from '../../styles/Products.module.css';
import ProductCard from '../../components/ProductCard';

const ProductsBoard: React.FC = () => {
 
    return (
            <div className={styles.productsBoard}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
    )
}

export default ProductsBoard;