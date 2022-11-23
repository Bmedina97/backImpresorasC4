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
  Usuario,
  Revision,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioRevisionController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/revisions', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Revision',
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
    return this.usuarioRepository.revisions(id).find(filter);
  }

  @post('/usuarios/{id}/revisions', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) revision: Omit<Revision, 'id'>,
  ): Promise<Revision> {
    return this.usuarioRepository.revisions(id).create(revision);
  }

  @patch('/usuarios/{id}/revisions', {
    responses: {
      '200': {
        description: 'Usuario.Revision PATCH success count',
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
    return this.usuarioRepository.revisions(id).patch(revision, where);
  }

  @del('/usuarios/{id}/revisions', {
    responses: {
      '200': {
        description: 'Usuario.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.usuarioRepository.revisions(id).delete(where);
  }
}
