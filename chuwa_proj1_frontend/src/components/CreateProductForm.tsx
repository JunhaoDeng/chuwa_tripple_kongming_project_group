import { useState } from "react";
import "../styles/CreateProductForm.css"
import AreaField from "./AreaField";
import DropdownField from "./DropdownField";
import Field from "./Field"
import { FileImageOutlined } from "@ant-design/icons";

export default function CreateProductForm() {
    const makeSimpleCheckFunc = (warn: string) => {
        return (data: string) => {
            if (data.length === 0) {
                return warn;
            }
            return "";
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const noOp = (data: string) => {
        return "";
    }

    const checkPrice = (price: string) => {
        try {
            if (price === "") { return "Price cannot be empty" }
            const pricenum = Number(price);
            if (pricenum < 0) {
                return "Price must be a non-negative number";
            }
            return "";
        } catch(e) {
            return "Price invalid"
        }
    }

    const checkQuantity = (quan: string) => {
        try {
            if (quan === "") { return "Quantity cannot be empty" }
            const qnum = Number(quan);
            if (qnum < 0) {
                return "Quantity must be a non-negative number";
            }
            return "";
        } catch(e) {
            return "Quantity invalid"
        }
    }

    const [link, setLink] = useState<string>(""); // only for testing

    const handle_preview = () => {
        setLink("https://images.unsplash.com/photo-1593642634367-d91a135587b5") // test
    }

    return <div className="cpf_container">
        <div className="cpf_title">Create Product</div>
        <div className="cpf_form">
            <Field label="Product name" type="text" checkFunc={ makeSimpleCheckFunc("Product name cannot be empty") } 
                placeholder="Enter product name" inputDataSelectorFunc={() => {}} label_bold={true} />
            <AreaField label="Product Description" checkFunc={ noOp } 
                placeholder="Enter product description" inputDataSelectorFunc={() => {}} label_bold={true}/>
            <div className="cpf_catprice_row">
                <div className="cpf_catprice_cell_padright">
                <DropdownField label="Category" checkFunc={ noOp } inputDataSelectorFunc={() => {}} 
                    label_bold={true} input_disabled={true}/>
                </div>
                <div className="cpf_catprice_cell_padleft">
                <Field label="Price" type="number" checkFunc={ checkPrice }
                    placeholder="Enter price" inputDataSelectorFunc={() => {}} label_bold={true}/>
                </div>
            </div>
            <div className="cpf_row4">
                <div className="cpf_catprice_cell_padright">
                    <Field label="In Stock Quantity" type="number" checkFunc={ checkQuantity }
                        placeholder="" inputDataSelectorFunc={ () => {} } label_bold={ true }/>
                </div>
                <div className="cpf_catprice_cell_padleft">
                    <div className="img_link_anchor">
                        <Field label="Add Image Link" type="text" checkFunc={ noOp }
                                placeholder="" inputDataSelectorFunc={ () => {} } label_bold={ true }/>
                        <button className="preview_button" onClick={ handle_preview }>Preview</button>
                    </div>
                </div>
            </div>
            <div className="img_preview_row">
                <div className="img_preview_box">
                    {
                        link.length === 0 ? 
                        <>
                        <FileImageOutlined className="fileimageicon"/>
                        <div className="image_preview_prompt">Image preview!</div>
                        </> :
                        <img src={ link } alt="Image not found" className="image_preview"/>
                    }
                </div>
            </div>
            <div className="add_product_button_container">
                <button className="add_product_button">Add Product</button>
            </div>
        </div>
    </div>
}