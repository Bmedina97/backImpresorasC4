import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RevisionRepuesto} from '../models';
import {RevisionRepuestoRepository} from '../repositories';

export class RevisionrepuestoController {
  constructor(
    @repository(RevisionRepuestoRepository)
    public revisionRepuestoRepository : RevisionRepuestoRepository,
  ) {}

  @post('/revision-repuestos')
  @response(200, {
    description: 'RevisionRepuesto model instance',
    content: {'application/json': {schema: getModelSchemaRef(RevisionRepuesto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionRepuesto, {
            title: 'NewRevisionRepuesto',
            exclude: ['id'],
          }),
        },
      },
    })
    revisionRepuesto: Omit<RevisionRepuesto, 'id'>,
  ): Promise<RevisionRepuesto> {
    return this.revisionRepuestoRepository.create(revisionRepuesto);
  }

  @get('/revision-repuestos/count')
  @response(200, {
    description: 'RevisionRepuesto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RevisionRepuesto) where?: Where<RevisionRepuesto>,
  ): Promise<Count> {
    return this.revisionRepuestoRepository.count(where);
  }

  @get('/revision-repuestos')
  @response(200, {
    description: 'Array of RevisionRepuesto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RevisionRepuesto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RevisionRepuesto) filter?: Filter<RevisionRepuesto>,
  ): Promise<RevisionRepuesto[]> {
    return this.revisionRepuestoRepository.find(filter);
  }

  @patch('/revision-repuestos')
  @response(200, {
    description: 'RevisionRepuesto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionRepuesto, {partial: true}),
        },
      },
    })
    revisionRepuesto: RevisionRepuesto,
    @param.where(RevisionRepuesto) where?: Where<RevisionRepuesto>,
  ): Promise<Count> {
    return this.revisionRepuestoRepository.updateAll(revisionRepuesto, where);
  }

  @get('/revision-repuestos/{id}')
  @response(200, {
    description: 'RevisionRepuesto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RevisionRepuesto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RevisionRepuesto, {exclude: 'where'}) filter?: FilterExcludingWhere<RevisionRepuesto>
  ): Promise<RevisionRepuesto> {
    return this.revisionRepuestoRepository.findById(id, filter);
  }

  @patch('/revision-repuestos/{id}')
  @response(204, {
    description: 'RevisionRepuesto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RevisionRepuesto, {partial: true}),
        },
      },
    })
    revisionRepuesto: RevisionRepuesto,
  ): Promise<void> {
    await this.revisionRepuestoRepository.updateById(id, revisionRepuesto);
  }

  @put('/revision-repuestos/{id}')
  @response(204, {
    description: 'RevisionRepuesto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() revisionRepuesto: RevisionRepuesto,
  ): Promise<void> {
    await this.revisionRepuestoRepository.replaceById(id, revisionRepuesto);
  }

  @del('/revision-repuestos/{id}')
  @response(204, {
    description: 'RevisionRepuesto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.revisionRepuestoRepository.deleteById(id);
  }
}
