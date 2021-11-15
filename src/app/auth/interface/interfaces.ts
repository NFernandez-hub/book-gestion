

export interface AuthResponceRenew {
    msg: string,
    nombre: string,
    ok: true,
    token: string,
    img: string
    uid: string
}

export interface usuarioLogin {
    ok: boolean
    token: string
    usuario: {
        celular: number
        codigoPostal: number
        email: string
        estado: boolean
        google: boolean
        img: string
        nombre: string
        provincia: string
        rol: string
        uid: string
    }
}

export interface Usuario {
    uid: string;
    nombre: string;
}