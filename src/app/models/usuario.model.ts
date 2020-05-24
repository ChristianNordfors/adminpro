
export class Usuario {

// El orden importa porque cuando se cree un objeto las propiedades
// deben ser inicializadas respetando el orden
// Luego de una propiedad opcional las que siguen tienen que ser copcionales
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {

    }

}
