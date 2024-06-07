// User auth
export interface Data {
  message: string;
  token: string;
  expiration_date: string;
  data: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UserRegister extends User {
  password: string;
}

export interface AuthStorageData {
  token: string;
  expiration_date: string;
}

// Campanha
export interface Campaign {
  id: number;
  name: string;
  description: string;
  date: string;
  donated_items_objective: number;
  donated_items_quantity: number;
  banner: string;
  avatar: string;
}

export interface CampaignById extends Campaign {
<<<<<<< HEAD
    start_date: string,
    end_date: string,
    addressess: Address[],
    necessary_items: ItemById[]
=======
  start_date: string;
  end_date: string;
  addressess: Address[];
  necessary_items: Item[];
>>>>>>> 30b5dc0e660eb72898629ca48cc4caac5e4d8f90
}

// Endereço
export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  latitude: number;
  longitude: number;
}

// Item da doação
export interface Item {
<<<<<<< HEAD
    id: number,
    name: string,
    status: string,

}

export interface ItemById extends Item {
    donated_total: number,
    quantity_objective: number
=======
  id: number;
  name: string;
  donated_total: number;
  quantity_objective: number;
>>>>>>> 30b5dc0e660eb72898629ca48cc4caac5e4d8f90
}

// Noticia
export interface News {
<<<<<<< HEAD
    id: number,
    title: string,
    subtitle: string,
    description: string,
    banners: string[],
=======
  id: number;
  title: string;
  subtitle: string;
  description: string;
  banner: string;
>>>>>>> 30b5dc0e660eb72898629ca48cc4caac5e4d8f90
}

// Instituição
export interface Institution {
<<<<<<< HEAD
    id: number,
    name: string,
    status: string,
    description: string,
    phone: string,
    avatar: string,
    banner: string,
    address: Address
=======
  id: number;
  name: string;
  status: string;
  description: string;
  phone: string;
  avatar: string;
  address: Address;
>>>>>>> 30b5dc0e660eb72898629ca48cc4caac5e4d8f90
}

export interface InstitutionById extends Institution {
  campaigns: Campaign[];
}
