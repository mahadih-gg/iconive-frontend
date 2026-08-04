export interface AddressBookEntry {
  id: string;
  label: string;
  street: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
