export interface Machine {
    id: number,
    brakes: string,
    createdAt: string,
    deposit: number,
    description: string,
    engine: string,
    fuel: string,
    machine_prices: MachinePrice[],
    manufacturer: string,
    mth: string,
    name: string,
    price: number,
    sizes: string,
    src: string,
    type: string,
    updatedAt: string,
    url: string,
    weight: string,
}

export interface MachinePrice {
    id: number,
    machine_id: number,
    length: string,
    price: number,
    createdAt: string,
    updatedAt: string
}
