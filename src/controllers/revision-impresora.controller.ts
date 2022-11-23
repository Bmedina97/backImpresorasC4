import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Revision,
  Impresora,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionImpresoraController {
  constructor(
    @repository(RevisionRepository)
    public revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/impresora', {
    responses: {
      '200': {
        description: 'Impresora belonging to Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Impresora)},
          },
        },
      },
    },
  })
  async getImpresora(
    @param.path.string('id') id: typeof Revision.prototype.id,
  ): Promise<Impresora> {
    return this.revisionRepository.impresora(id);
  }
}
