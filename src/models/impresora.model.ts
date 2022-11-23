import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Revision} from './revision.model';

@model()
export class Impresora extends Entity {
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
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoImpresora: number;

  /*@property({
    type: 'number',
    required: true,
  })
  tipoImpresora: number;*/

  @property({
    type: 'string',
    required: true,
  })
  velocidadImpresion: string;

  @property({
    type: 'number',
    required: true,
  })
  volumenAlto: number;

  @property({
    type: 'number',
    required: true,
  })
  volumenLargo: number;

  @property({
    type: 'number',
    required: true,
  })
  volumenProfundo: number;

  @property({
    type: 'string',
  })
  caracterizticas?: string;

  @property({
    type: 'date',
  })
  seguroRobo?: string;
 
  
  @property({
    type: 'date',
  })
  seguroContractual?: string;

  @hasMany(() => Revision)
  revisions: Revision[];


  constructor(data?: Partial<Impresora>) {
    super(data);
  }
}

export interface ImpresoraRelations {
  // describe navigational properties here
}

export type ImpresoraWithRelations = Impresora & ImpresoraRelations;
