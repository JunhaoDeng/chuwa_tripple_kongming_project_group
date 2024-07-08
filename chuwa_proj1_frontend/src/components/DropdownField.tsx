/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/Field.css"
import "../styles/DropdownField.css"
import Field from "./Field"
import { CaretDownOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../redux/store"

type DropDownFieldPropType = {
    label: string,
    ssid?: string,
    // this check function will check if current input data (which is stored in redux) is valid.
    // if valid, return an empty string
    // if invalid, return error message
    checkFunc: (data: string) => string, 
    inputDataSelectorFunc: (state: any) => any,
    errormsgSelectorFunc: (state: any) => any,
    inputDataAction: any,
    errormsgAction: any,
    label_bold?: boolean
    input_disabled?: boolean 
}

export default function DropdownField(props: DropDownFieldPropType) {
    // type FieldPropType = {
    // label: string,
    // type: string,
    // // this check function will check if current input data (which is stored in redux) is valid.
    // // if valid, return an empty string
    // // if invalid, return error message
    // checkFunc: (data: string) => string, 
    // placeholder: string,
    // inputDataSelectorFunc: (state: any) => any
    // label_bold?: boolean
    // input_disabled?: boolean 

    const data: string[] = ["category1", "category2", "category3", "category4"];

    const [menushow, setMenushow] = useState<boolean>(false);
    const input_data = useSelector(props.inputDataSelectorFunc);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (props.ssid !== undefined) {
            const data = sessionStorage.getItem(props.ssid);
            if (data !== null) {
                dispatch(props.inputDataAction(data));
            }
        }
    }, [dispatch])
    
    const handleMenuItemClicked = (idx: number) => {
        // console.log(`Item clicked: ${data[idx]}`);
        dispatch(props.inputDataAction(data[idx]));
        if (props.ssid !== undefined) {
            sessionStorage.setItem(props.ssid, data[idx]);
        }
        setMenushow(false);
        // todo: connect to redux state
    }

    const handleIconClicked = () => {
        setMenushow((prev) => !prev);
    }

    return <div className="dropdown_anchor">
        <Field label={ props.label } type="text" ssid={ props.ssid } 
            checkFunc={ props.checkFunc } 
            inputDataSelectorFunc={ props.inputDataSelectorFunc } 
            errormsgDataSelectorFunc={ props.errormsgSelectorFunc }
            inputDataAction={ props.inputDataAction }
            errormsgAction={ props.errormsgAction }
            label_bold={ props.label_bold }
            input_disabled={ props.input_disabled } placeholder=""/>
        <div className="dropdown_icon_container" onClick={ handleIconClicked }><CaretDownOutlined /></div>
        { 
        menushow ? 
        <div className="dropdown_menu">
            {
                data.map((value, index) => 
                    <div key={ index } className="dropdown_item" 
                            onClick={ () => handleMenuItemClicked(index)}>
                        { value }
                    </div>)
            }
        </div>
        : null
        }
    </div>
}
    
