export interface IProduct {
    id: string;
    title: string;
    description: string;
    storeId: string;
    image: string;
}

export interface IOrder {
    id: string;
    title: string;
    productId: string;
    customerName: string;
    customerAdress: string;
    quantitity: number;
    storeId: string;
    status: "delivered" | "not delivered";
}

export interface IStore {
    id: string;
    title: string;
}
