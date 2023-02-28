export type DetailService = {
  descripcion: string;
  fechaCreacion: string;
  id: string;
  imagenes: string[];
  direccion: string;
  categoria: string;
  precio: number;
  titulo: string;
  tipo: string;
  urlImagenPrincipal: string;
  usuarioPublicante: string;
  activa: boolean;
  estado: string;
};

export enum StatusPublish {
  RECHAZADA = 'RECHAZADA',
  ACEPTADA = 'ACEPTADA',
  PENDIENTE = 'PENDIENTE'
}
