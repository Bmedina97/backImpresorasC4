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
import {Impresora} from '../models';
import {ImpresoraRepository} from '../repositories';

export class ImpresoraController {
  constructor(
    @repository(ImpresoraRepository)
    public impresoraRepository : ImpresoraRepository,
  ) {}

  @post('/impresoras')
  @response(200, {
    description: 'Impresora model instance',
    content: {'application/json': {schema: getModelSchemaRef(Impresora)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Impresora, {
            title: 'NewImpresora',
            exclude: ['id'],
          }),
        },
      },
    })
    impresora: Omit<Impresora, 'id'>,
  ): Promise<Impresora> {
    return this.impresoraRepository.create(impresora);
  }

  @get('/impresoras/count')
  @response(200, {
    description: 'Impresora model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Impresora) where?: Where<Impresora>,
  ): Promise<Count> {
    return this.impresoraRepository.count(where);
  }

  @get('/impresoras')
  @response(200, {
    description: 'Array of Impresora model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Impresora, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Impresora) filter?: Filter<Impresora>,
  ): Promise<Impresora[]> {
    return this.impresoraRepository.find(filter);
  }

  @patch('/impresoras')
  @response(200, {
    description: 'Impresora PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Impresora, {partial: true}),
        },
      },
    })
    impresora: Impresora,
    @param.where(Impresora) where?: Where<Impresora>,
  ): Promise<Count> {
    return this.impresoraRepository.updateAll(impresora, where);
  }

  @get('/impresoras/{id}')
  @response(200, {
    description: 'Impresora model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Impresora, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Impresora, {exclude: 'where'}) filter?: FilterExcludingWhere<Impresora>
  ): Promise<Impresora> {
    return this.impresoraRepository.findById(id, filter);
  }

  @patch('/impresoras/{id}')
  @response(204, {
    description: 'Impresora PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Impresora, {partial: true}),
        },
      },
    })
    impresora: Impresora,
  ): Promise<void> {
    await this.impresoraRepository.updateById(id, impresora);
  }

  @put('/impresoras/{id}')
  @response(204, {
    description: 'Impresora PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() impresora: Impresora,
  ): Promise<void> {
    await this.impresoraRepository.replaceById(id, impresora);
  }

  @del('/impresoras/{id}')
  @response(204, {
    description: 'Impresora DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.impresoraRepository.deleteById(id);
  }
}
