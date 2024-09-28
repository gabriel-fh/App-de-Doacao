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
  start_date: string;
  end_date: string;
  addressess: Address[];
  necessary_items: ItemById[];
  donation_end_time: string;
  donation_start_time: string;
  institution: {
    id: number;
    avatar: string;
    name: string;
    phone: string;
  };
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
  id: number;
  name: string;
  status: string;
}

export interface ItemById extends Item {
  donated_total: number;
  quantity_objective: number;
  quantity?: number;
}

// Noticia
export interface News {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  banners: string[];
}

// Instituição
export interface Institution {
  id: number;
  name: string;
  status: string;
  description: string;
  phone: string;
  avatar: string;
  banner: string;
  address: Address;
}

export interface InstitutionById extends Institution {
  campaigns: Campaign[];
}

// Doação

export interface Donation {
  id: number;
  campaign: Campaign;
  donation_time: string;
  items: {
    id: number;
    name: string;
    quantity: number;
  }[];
  status: string;
}
