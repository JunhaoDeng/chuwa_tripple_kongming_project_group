import React from 'react';
import { useState } from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import styles from '../../styles/Products.module.css';
import ProductCard from '../../components/ProductCard';

// const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };



const Products: React.FC = () => {
    const setSortBy = (val: String) => {
        console.log(val);
        // wait to implement
    }

    // Pagination
    const [current, setCurrent] = useState(3);

    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrent(page);
    };


    return (
        <div className={styles.pageWrapper}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Products</h1>
                <div className={styles.opWrapper}>
                    <select
                        className={styles.sortInput}
                        name='SortBy'
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="0">Last added</option>
                        <option value="1" selected>Price: low to high</option>
                        <option value="2">Price: high to low</option>
                    </select>
                    <button className={styles.addButton}>Add Product</button>
                </div>
            </div>
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
            <Pagination className={styles.pageNav} current={current} onChange={onChange} total={50} />

        </div>
    )
}

export default Products;