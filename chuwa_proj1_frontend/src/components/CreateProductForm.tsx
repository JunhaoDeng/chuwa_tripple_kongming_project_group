import { useState } from "react";
import "../styles/CreateProductForm.css"
import AreaField from "./AreaField";
import DropdownField from "./DropdownField";
import Field from "./Field"
import { FileImageOutlined } from "@ant-design/icons";
import { AppDispatch, RootState } from "../redux/store";
import { createProductSetCategory, createProductSetCategoryErrormsg, createProductSetDescription, createProductSetDescriptionErrormsg, createProductSetImageLink, createProductSetImageLinkErrormsg, createProductSetImageLinkPreview, createProductSetName, createProductSetNameErrormsg, createProductSetPrice, createProductSetPriceErrormsg, createProductSetQuantity, createProductSetQuantityErrormsg } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { HOST } from "../config";

type ProductDataType = {
    name: string,
    description: string,
    category: string,
    price_cent: number,
    quantity: number,
    img_link: string
};

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

    const productNameSelector = (state: RootState) => state.create_product.name;

    const productDescriptionSelector = (state: RootState) => state.create_product.description;

    const categorySelector = (state: RootState) => state.create_product.category;

    const priceSelector = (state: RootState) => state.create_product.price;

    const quantitySelector = (state: RootState) => state.create_product.quantity;

    const imageLinkSelector = (state: RootState) => state.create_product.image_link;

    const imageLinkPreviewSelector = (state: RootState) => state.create_product.image_link_preview;

    const name: string = useSelector(productNameSelector);
    const description: string = useSelector(productDescriptionSelector);
    const category: string = useSelector(categorySelector);
    const price = useSelector(priceSelector);
    const quantity = useSelector(quantitySelector);
    const imageLink = useSelector(imageLinkSelector);
    const imageLinkPreview = useSelector(imageLinkPreviewSelector);

    const dispatch: AppDispatch = useDispatch();

    const handle_preview = () => {
        // setLink("https://images.unsplash.com/photo-1593642634367-d91a135587b5") // test
        dispatch(createProductSetImageLinkPreview(imageLink));
    }

    const handleFormSubmit = () => {
        const productData: ProductDataType= {
            name: name,
            description: description,
            category: category,
            price_cent: Math.floor(Number(price) * 100),
            quantity: Number(quantity),
            img_link: imageLink
        };
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        }
        // console.log(options);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let decoded: any = null;
        try {
            decoded = jwtDecode(sessionStorage.getItem("token") as string);
        } catch(err) {
            alert("Token invalid or missing");
            return;
        }
        fetch(`${HOST}/api/users/${decoded.id}/product`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            alert(err);
        }) 
        
        
    }
    


    return <div className="cpf_container">
        <div className="cpf_title">Create Product</div>
        <div className="cpf_form">
            <Field label="Product name" ssid="cp_product_name" type="text" 
                checkFunc={ makeSimpleCheckFunc("Product name cannot be empty") } 
                placeholder="Enter product name" 
                inputDataSelectorFunc={ productNameSelector } 
                errormsgDataSelectorFunc={ (state: RootState) => state.create_product.name_errormsg}
                inputDataAction={ createProductSetName }
                errormsgAction={ createProductSetNameErrormsg }
                label_bold={true} />
            <AreaField label="Product Description" ssid="cp_product_description" 
                checkFunc={ noOp } 
                placeholder="Enter product description" 
                inputDataSelectorFunc={productDescriptionSelector} 
                errormsgSelectorFunc={ (state: RootState) => state.create_product.description_errormsg}
                inputDataAction={ createProductSetDescription }
                errormsgAction={ createProductSetDescriptionErrormsg }
                label_bold={true}/>
            <div className="cpf_catprice_row">
                <div className="cpf_catprice_cell_padright">
                <DropdownField label="Category" ssid="cp_category"
                    checkFunc={ noOp } 
                    inputDataSelectorFunc={ categorySelector }
                    errormsgSelectorFunc={ (state: RootState) => state.create_product.category_errormsg } 
                    inputDataAction={ createProductSetCategory }
                    errormsgAction={ createProductSetCategoryErrormsg }
                    label_bold={true} input_disabled={true}/>
                </div>
                <div className="cpf_catprice_cell_padleft">
                <Field label="Price" type="number" ssid="cp_price" 
                    checkFunc={ checkPrice }
                    placeholder="Enter price" 
                    inputDataSelectorFunc={ priceSelector }
                    errormsgDataSelectorFunc={ (state: RootState) => state.create_product.price_errormsg }
                    inputDataAction={ createProductSetPrice }
                    errormsgAction={ createProductSetPriceErrormsg }
                    label_bold={true}/>
                </div>
            </div>
            <div className="cpf_row4">
                <div className="cpf_catprice_cell_padright">
                    <Field label="In Stock Quantity" type="number" ssid="cp_quantity"
                        checkFunc={ checkQuantity }
                        placeholder="" 
                        inputDataSelectorFunc={ quantitySelector } 
                        errormsgDataSelectorFunc={ (state: RootState) => state.create_product.quantity_errormsg }
                        inputDataAction={ createProductSetQuantity }
                        errormsgAction={ createProductSetQuantityErrormsg }
                        label_bold={ true }/>
                </div>
                <div className="cpf_catprice_cell_padleft">
                    <div className="img_link_anchor">
                        <Field label="Add Image Link" type="text" ssid="cp_image_link" 
                            checkFunc={ noOp }
                            placeholder="" 
                            inputDataSelectorFunc={ imageLinkSelector }
                            errormsgDataSelectorFunc={ (state: RootState) => state.create_product.image_link_errormsg}
                            inputDataAction={ createProductSetImageLink }
                            errormsgAction={ createProductSetImageLinkErrormsg } 
                            label_bold={ true }/>
                        <button className="preview_button" onClick={ handle_preview }>Preview</button>
                    </div>
                </div>
            </div>
            <div className="img_preview_row">
                <div className="img_preview_box">
                    {
                        imageLinkPreview.length === 0 ? 
                        <>
                        <FileImageOutlined className="fileimageicon"/>
                        <div className="image_preview_prompt">Image preview!</div>
                        </> :
                        <img src={ imageLinkPreview } alt="Image not found" className="image_preview"/>
                    }
                </div>
            </div>
            <div className="add_product_button_container">
                <button className="add_product_button" onClick={ handleFormSubmit }>Add Product</button>
            </div>
        </div>
    </div>
}