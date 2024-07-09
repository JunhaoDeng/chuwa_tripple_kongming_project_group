/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { InputNumber, Button, ConfigProvider, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import '../../styles/QuantityController.css';
// import { useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { HOST } from '../../config';
import { jwtDecode } from 'jwt-decode';
import { ASThunkDatatype, productDetailAsyncSetNumAdded } from '../../redux/slice';

// const minusBtn = (
//     <Button>-</Button>
// );

// const addBtn = (
//     <Button>+</Button>
// );

type QuantitiControllerPropType = {
    quantitySelectorFunc: (state: RootState) => number,
    productIdSelectorFunc: (state: RootState) => string,
    setQuantityAction: any
}

const QuantitiController = (props: QuantitiControllerPropType) => {
    // const [count, setCount] = useState(5);
    const count = useSelector(props.quantitySelectorFunc);
    const product_id: string = useSelector(props.productIdSelectorFunc);
    const dispatch: AppDispatch = useDispatch();

    const [tempCount, setTempCount] = useState<number>(count);

    const handleMinusClick = () => {
        console.log(count);
        
        let decoded: any = null;
        try {
            decoded = jwtDecode(sessionStorage.getItem("token") as string);
        } catch(err) {
            alert("Token invalid or missing");
            return;
        }
        // console.log(decoded);

        const postbody = {
            quantity: count - 1
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

    const handlePlusClick = () => {
        let decoded: any = null;
        try {
            decoded = jwtDecode(sessionStorage.getItem("token") as string);
        } catch(err) {
            alert("Token invalid or missing");
            return;
        }
        // console.log(decoded);

        const postbody = {
            quantity: count + 1
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

    const handleInputBlur = () => {
        // setCount(val);
        if (tempCount === -1) {
            setTempCount(count);
            return;
        }
        
        let decoded: any = null;
        try {
            decoded = jwtDecode(sessionStorage.getItem("token") as string);
        } catch(err) {
            alert("Token invalid or missing");
            return;
        }
        // console.log(decoded);

        const postbody = {
            quantity: tempCount
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

        // fetch(`${HOST}/api/users/${decoded.id}/cart/${product_id}`, options)
        // .then(response => response.json())
        // .then(data => {
        //     let newCount = 0;
        //     for (let i = 0; i < data.items.length; ++i) {
        //         if (data.items[i].product === product_id) {
        //             newCount = Number(data.items[i].quantity);
        //             break;
        //         }
        //     }
        //     dispatch(props.setQuantityAction(newCount));
        // })
        // .catch(err => {
        //     console.log(err);
        // });
    }

    const handleInputChange = (val: number | null) => {
        if (val === null) {
            setTempCount(-1);
        } else {
            // dispatch(props.setQuantityAction(val));
            setTempCount(val);
        }
        
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    InputNumber: {
                        paddingInlineSM: 5,
                    }
                },
            }}
        >
            <Space.Compact block style={{ width: "5rem"}}>
                <Button style={{ width: '25%' }} size='small' icon={<MinusOutlined onClick={handleMinusClick} />}></Button>
                <InputNumber style={{ width: '50%' }} className="quantityInput" size="small" controls={false} defaultValue={count} value={count}
                 onChange={(val) => handleInputChange(val)} onBlur={ handleInputBlur }/>
                <Button style={{ width: '25%' }} size='small' icon={<PlusOutlined onClick={handlePlusClick} />}></Button>
            </Space.Compact>
        </ConfigProvider>
    )
};

export default QuantitiController;