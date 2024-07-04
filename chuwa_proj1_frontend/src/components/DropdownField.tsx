/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/Field.css"
import "../styles/DropdownField.css"
import Field from "./Field"
import { CaretDownOutlined } from "@ant-design/icons"
import { useState } from "react"

type DropDownFieldPropType = {
    label: string,
    // this check function will check if current input data (which is stored in redux) is valid.
    // if valid, return an empty string
    // if invalid, return error message
    checkFunc: (data: string) => string, 
    inputDataSelectorFunc: (state: any) => any
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

    const data: string[] = ["Furniture", "Electronic products", "Food", "Soft drinks", "Meats"];

    const [menushow, setMenushow] = useState<boolean>(false);
    const handleMenuItemClicked = (idx: number) => {
        console.log(`Item clicked: ${data[idx]}`);
        setMenushow(false);
        // todo: connect to redux state
    }

    const handleIconClicked = () => {
        setMenushow((prev) => !prev);
    }

    return <div className="dropdown_anchor">
        <Field label={ props.label } type="text" checkFunc={ props.checkFunc } 
            inputDataSelectorFunc={ props.inputDataSelectorFunc } label_bold={ props.label_bold }
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
    
