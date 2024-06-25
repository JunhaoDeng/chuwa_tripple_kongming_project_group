export interface AccountDataType {
    email: string,
    enc_password: string,
    type: string,
    cart?: string
};

export interface CartDataType {
    zip_code?: string,
    discount_cent: number,
    estimated_total_cent: number
};

export interface ProductDataType {
    name: string,
    description?: string,
    category?: string,
    price_cent: number,
    quantity: number,
    img_link?: string,
    created_by: string,
    create_time: Date,
    update_time: Date
};

export type IDString = string;