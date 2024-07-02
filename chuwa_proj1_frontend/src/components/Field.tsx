/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
import "../styles/Field.css"

type FieldPropType = {
    label: string,
    type: string,
    // this check function will check if current input data (which is stored in redux) is valid.
    // if valid, return an empty string
    // if invalid, return error message
    checkFunc: (data: string) => string, 
    placeholder: string,
    inputDataSelectorFunc: (state: any) => any
}

export default function Field(props: FieldPropType) {

    // const input_data = useSelector( props.inputDataSelectorFunc );
    const [input_data, setInputData] = useState<string>(""); // test
    const [error_msg, setErrorMsg] = useState<string>("");

    const handleInputChange = (value: string) => {
        // useDispatch(...)
        setInputData(value); // test
    };

    const handleCheck = () => {
        const msg: string = props.checkFunc(input_data);
        setErrorMsg(msg);
    }

    return (
        <div className="field">
            <div className="field_label">{ props.label }</div>
            <input className='field_input' type={ props.type } placeholder={ props.placeholder } 
                    onChange={ (e) => handleInputChange(e.target.value) }
                    onBlur={ handleCheck } style={ { borderColor: error_msg === "" ? "rgb(188, 188, 188)" : "red"} }/>
            <div className='error_msg'>{ error_msg }</div>
        </div>
    )
}