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