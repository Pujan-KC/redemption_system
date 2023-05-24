export enum OrderStatus {
    submitted = 'SUBMITTED',
    approved = 'APPROVED',
    dispatched = 'DISPATCHED',
    delivered = 'DELIVERED'
}

export interface ShippingDetails {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2: string
    country: string
    state: string
    city: string
    pinCode: string
}