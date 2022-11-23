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
  Usuario,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionUsuarioController {
  constructor(
    @repository(RevisionRepository)
    public revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Revision.prototype.id,
  ): Promise<Usuario> {
    return this.revisionRepository.usuario(id);
  }
}
