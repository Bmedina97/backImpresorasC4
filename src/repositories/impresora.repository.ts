import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbImpresoras3DDataSource} from '../datasources';
import {Impresora, ImpresoraRelations, Revision} from '../models';
import {RevisionRepository} from './revision.repository';

export class ImpresoraRepository extends DefaultCrudRepository<
  Impresora,
  typeof Impresora.prototype.id,
  ImpresoraRelations
> {

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Impresora.prototype.id>;

  constructor(
    @inject('datasources.dbImpresoras3d') dataSource: DbImpresoras3DDataSource, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Impresora, dataSource);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
  }
}
