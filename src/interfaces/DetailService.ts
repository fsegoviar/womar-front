export type DetailService = {
  descripcion: string;
  fechaCreacion: string;
  id: string;
  imagenes: string[];
  direccion: string;
  categoria: string;
  categoriaId: number;
  subCategoriaId: number;
  precio: number;
  titulo: string;
  tipo: string;
  urlImagenPrincipal: string;
  usuarioPublicante: string;
  activa: boolean;
  estado: string;
  regionId: number;
};

export enum StatusPublish {
  RECHAZADA = 'RECHAZADA',
  ACEPTADA = 'ACEPTADA',
  PENDIENTE = 'PENDIENTE',
  DESACTIVADA = 'DESACTIVADA'
}
