import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Repuesto} from './repuesto.model';
import {RevisionRepuesto} from './revision-repuesto.model';
import {Impresora} from './impresora.model';

@model()
export class Revision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_revision: string;

  @property({
    type: 'date',
    required: true,
  })
  hora_revision: string;

  @property({
    type: 'number',
    required: true,
  })
  estadoCabezal: number;

  @property({
    type: 'number',
    required: true,
  })
  estadoExcrusor: number;

  @property({
    type: 'number',
    required: true,
  })
  voltajeFuente: number;

  @property({
    type: 'number',
    required: true,
  })
  alineacion: number;

  @property({
    type: 'boolean',
    required: true,
  })
  softwareActualizado: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Impresora)
  impresoraId: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Repuesto, {through: {model: () => RevisionRepuesto}})
  repuestos: Repuesto[];

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
