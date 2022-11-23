import {Entity, model, property} from '@loopback/repository';

@model()
export class RevisionRepuesto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    default: "NO aplica"
  })
  justificacion?: string;

  @property({
    type: 'string',
  })
  revisionId?: string;

  @property({
    type: 'string',
  })
  repuestoId?: string;

  constructor(data?: Partial<RevisionRepuesto>) {
    super(data);
  }
}

export interface RevisionRepuestoRelations {
  // describe navigational properties here
}

export type RevisionRepuestoWithRelations = RevisionRepuesto & RevisionRepuestoRelations;
