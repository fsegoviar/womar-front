interface RegisterUser {
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno?: string;
  Rut: string;
  ComunaId: number;
  Telefono?: number;
  Email: string;
  Password: string;
  Role: string;
  Origen?: number;
  ImagenPerfil: FormData;
}

interface RegisterExternalUser {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  comunaId: number;
  telefono: string;
  email: string;
  rut: string;
  proveedor: string;
  role: string;
}

export type { RegisterUser, RegisterExternalUser };
