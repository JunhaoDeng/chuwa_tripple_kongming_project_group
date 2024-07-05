/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/Field.css"
import { RootState, AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';

type FieldPropType = {
    label: string,
    type: string,
    // this check function will check if current input data (which is stored in redux) is valid.
    // if valid, return an empty string
    // if invalid, return error message
    checkFunc: (data: string) => string, 
    placeholder: string,
    inputDataSelectorFunc: (state: RootState) => any,
    errormsgDataSelectorFunc: (state: RootState) => any,
    inputDataAction: any,
    errormsgAction: any,
    label_bold?: boolean,
    input_disabled?: boolean 
}

export default function Field(props: FieldPropType) {

    const input_data = useSelector( props.inputDataSelectorFunc );
    const error_msg = useSelector( props.errormsgDataSelectorFunc );

    const dispatch: AppDispatch = useDispatch();

    const handleInputChange = (value: string) => {
        dispatch(props.inputDataAction(value));
    };

    const handleCheck = () => {
        const msg: string = props.checkFunc(input_data);
        dispatch(props.errormsgAction(msg));
    }

    return (
        <div className="field">
            <div className={ "field_label " + (props.label_bold ? "bold" : "") }>{ props.label }</div>
            <input className='field_input' type={ props.type } placeholder={ props.placeholder } disabled={ props.input_disabled }
                    onChange={ (e) => handleInputChange(e.target.value) }
                    onBlur={ handleCheck } style={ { borderColor: error_msg === "" ? "rgb(188, 188, 188)" : "red"} }/>
            <div className='error_msg'>{ error_msg }</div>
        </div>
    )
}