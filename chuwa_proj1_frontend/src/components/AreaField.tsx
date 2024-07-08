/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import "../styles/Field.css"
import "../styles/AreaField.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';

type FieldPropType = {
    label: string,
    ssid?: string, // id for retrieving session storage
    // this check function will check if current input data (which is stored in redux) is valid.
    // if valid, return an empty string
    // if invalid, return error message
    checkFunc: (data: string) => string, 
    placeholder: string,
    inputDataSelectorFunc: (state: any) => any,
    errormsgSelectorFunc: (state: any) => any,
    inputDataAction: any,
    errormsgAction: any
    label_bold?: boolean
}

export default function AreaField(props: FieldPropType) {

    const input_data = useSelector( props.inputDataSelectorFunc );
    // const [input_data, setInputData] = useState<string>(""); // test
    const error_msg = useSelector(props.errormsgSelectorFunc);
    // const [error_msg, setErrorMsg] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (props.ssid !== undefined) {
            const data = sessionStorage.getItem(props.ssid);
            if (data !== null) {
                dispatch(props.inputDataAction(data));
            }
        }
    }, [dispatch])

    const handleInputChange = (value: string) => {
        dispatch(props.inputDataAction(value));
        // console.log(input_data);
        
        if (props.ssid !== undefined) {
            sessionStorage.setItem(props.ssid, value);
        }
    };

    const handleCheck = () => {
        const msg: string = props.checkFunc(input_data);
        dispatch(props.errormsgAction(msg));
    }

    return (
        <div className="field">
            <div className={ "field_label " + (props.label_bold ? "bold" : "") }>{ props.label }</div>
            <textarea className='field_input area_field_input' placeholder={ props.placeholder } value={ input_data }
                    onChange={ (e) => handleInputChange(e.target.value) }
                    onBlur={ handleCheck } style={ { borderColor: error_msg === "" ? "rgb(188, 188, 188)" : "red"} }/>
            <div className='error_msg'>{ error_msg }</div>
        </div>
    )
}