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

export interface News {
    id: number,
    title: string,
    subtitle: string,
    description: string,
    banner: string,
}