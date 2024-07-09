import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Select, Pagination, Flex } from 'antd';
import type { PaginationProps } from 'antd';
import styles from '../../styles/Products.module.css';
import btnStyles from '../../styles/Btn.module.css';
import responsiveStyles from '../../styles/Adjustor.module.css';

import ProductsBoard from './ProductsBoard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { AsyncSetProductDataType, productsAsyncSetProductList } from '../../redux/slice';
import { HOST } from '../../config';
import { jwtDecode } from 'jwt-decode';


const ProductsPage: React.FC = () => {
  // const setSortBy = (val: String) => {
  //     console.log(val);
  //     // wait to implement
  // }


    // Pagination
    const [current, setCurrent] = useState(1);
    
    const product_list: any = useSelector((state: RootState) => state.products.product_list);

    const dummy = 6.8;
    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrent(page);
    };

    // component
    return (
        <div className={styles.pageWrapper}>
            <Flex className={responsiveStyles.responsiveWrap} justify='space-between' gap='large'>
                <h1 className={styles.title}>Products</h1>
                <div className={styles.opWrapper}>
                    <Select
                        defaultValue="1"
                        style={{ width: 'maxContent' }}
                        // onChange={handleChange}
                        options={[
                            { value: '0', label: 'Last added' },
                            // { value: '0', label: 'Last added', disabled: true },
                            { value: '1', label: 'Price: low to high' },
                            { value: '2', label: 'Price: high to low' },
                        ]}
                    />
                    <Button className={btnStyles.uniformPrimaryBtn}>Add Product</Button>
                </div>
            </Flex>
            <ProductsBoard current_page={current}/>
            <Pagination className={styles.pageNav} current={current} onChange={onChange} total={ product_list.length } pageSize={ 10 } showSizeChanger={false}/>
    </div>
  );
};

export default ProductsPage;
