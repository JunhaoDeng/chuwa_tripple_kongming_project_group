/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import "../styles/Field.css"
import "../styles/AreaField.css"

type FieldPropType = {
    label: string,
    // this check function will check if current input data (which is stored in redux) is valid.
    // if valid, return an empty string
    // if invalid, return error message
    checkFunc: (data: string) => string, 
    placeholder: string,
    inputDataSelectorFunc: (state: any) => any,
    label_bold?: boolean
}

export default function AreaField(props: FieldPropType) {

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
            <div className={ "field_label " + (props.label_bold ? "bold" : "") }>{ props.label }</div>
            <textarea className='field_input area_field_input' placeholder={ props.placeholder } 
                    onChange={ (e) => handleInputChange(e.target.value) }
                    onBlur={ handleCheck } style={ { borderColor: error_msg === "" ? "rgb(188, 188, 188)" : "red"} }/>
            <div className='error_msg'>{ error_msg }</div>
        </div>
    )
}