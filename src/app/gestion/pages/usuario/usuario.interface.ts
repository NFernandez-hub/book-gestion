export interface Usuario {

    ok: boolean,
    uid?:string,
    nombre: string,
    email: string,
    password: string,
    img: string,
    rol: Role,
    estado: boolean,
    google: boolean,
    provincia: string,
    codigoPostal?: number,
    localidad: string,
    celular?: number,
    direccion: string

}

export enum Role {
    USER_ROLE = "USER_ROLE",
    ADMIN_ROLE = "ADMIN_ROLE"
}

export enum TiposBuscador {
    
    f = 'f',
}