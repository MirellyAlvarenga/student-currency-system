export type InstituitionDTO = {
    id: number,
    name: string,
}

export type StudentDTO = {
    id: number,
    name: string,
    email: string,
    cpf: string,
    rg: string,
    address: string,
    course: string,
    coins: number,
    instituition: InstituitionDTO,
}