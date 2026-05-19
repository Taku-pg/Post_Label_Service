export interface DeliveryInfo{
    sender: Sender,
    senderAddress: Address,
    receiverAddress: Address,
    deliveryMethod: string,
    deliveryPurpose: string|null
}

interface Sender{
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    company: string|null
}

interface Address{
    street: string,
    city: string,
    zip: string,
    country: string|null
}