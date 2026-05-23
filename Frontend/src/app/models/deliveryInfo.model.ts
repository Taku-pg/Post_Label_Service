export interface DeliveryInfo{
    sender: Sender,
    receiver: Receiver,
    deliveryOption: string,
    deliveryPurpose: string|null
}

interface Sender{
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    company: string|null,
    address: Address
}

interface Receiver{
    firstName: string,
    lastName: string,
    address: Address
}

interface Address{
    street: string,
    city: string,
    zip: string,
    country: string|null
}