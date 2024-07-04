import React from 'react';
import { InputNumber, Button, ConfigProvider, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import '../../styles/QuantityController.css';
import { useState } from 'react';

// const minusBtn = (
//     <Button>-</Button>
// );

// const addBtn = (
//     <Button>+</Button>
// );



const QuantitiController: React.FC = () => {
    const [count, setCount] = useState(5);

    const handleMinusClick = () => {
        let newCount = count - 1;
        setCount(newCount);
    }
    const handlePlusClick = () => {
        let newCount = count + 1;
        setCount(newCount);
    }
    const handleInputChange = (val: number) => {
        setCount(val);
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
                <InputNumber style={{ width: '50%' }} className="quantityInput" size="small" controls={false} defaultValue={count} value={count} onChange={(val) => handleInputChange(val)} />
                <Button style={{ width: '25%' }} size='small' icon={<PlusOutlined onClick={handlePlusClick} />}></Button>
            </Space.Compact>
        </ConfigProvider>
    )
};

export default QuantitiController;