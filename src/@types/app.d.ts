export interface Campaign {
    id: number,
    name: string,
    description: string,
    date: string,
    donated_items_objective: number,
    donated_items_quantity: number,
    banner: string,
    avatar: string,
}

export interface CampaignById extends Campaign {
    start_date: string,
    end_date: string,
    addressess: Address[],
    necessary_items: Item[]
}

export interface Address {
    id: number,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    latitude: number,
    longitude: number
}

export interface Item {
    id: number,
    name: string,
    donated_total: number,
    quantity_objective: number

}

export interface News {
    id: number,
    title: string,
    subtitle: string,
    description: string,
    banners: string[],
}

export interface Institution {
    id: number,
    name: string,
    status: string,
    description: string,
    phone: string,
    avatar: string,
    banner: string,
    address: Address
}

export interface InstitutionById extends Institution {
    campaigns: Campaign[],
}