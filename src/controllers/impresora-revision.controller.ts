import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Impresora,
  Revision,
} from '../models';
import {ImpresoraRepository} from '../repositories';

export class ImpresoraRevisionController {
  constructor(
    @repository(ImpresoraRepository) protected impresoraRepository: ImpresoraRepository,
  ) { }

  @get('/impresoras/{id}/revisions', {
    responses: {
      '200': {
        description: 'Array of Impresora has many Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revision>,
  ): Promise<Revision[]> {
    return this.impresoraRepository.revisions(id).find(filter);
  }

  @post('/impresoras/{id}/revisions', {
    responses: {
      '200': {
        description: 'Impresora model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Impresora.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInImpresora',
            exclude: ['id'],
            optional: ['impresoraId']
          }),
        },
      },
    }) revision: Omit<Revision, 'id'>,
  ): Promise<Revision> {
    return this.impresoraRepository.revisions(id).create(revision);
  }

  @patch('/impresoras/{id}/revisions', {
    responses: {
      '200': {
        description: 'Impresora.Revision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {partial: true}),
        },
      },
    })
    revision: Partial<Revision>,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.impresoraRepository.revisions(id).patch(revision, where);
  }

  @del('/impresoras/{id}/revisions', {
    responses: {
      '200': {
        description: 'Impresora.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.impresoraRepository.revisions(id).delete(where);
  }
}
