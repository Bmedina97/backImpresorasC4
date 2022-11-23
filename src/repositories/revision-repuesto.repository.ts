import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbImpresoras3DDataSource} from '../datasources';
import {RevisionRepuesto, RevisionRepuestoRelations} from '../models';

export class RevisionRepuestoRepository extends DefaultCrudRepository<
  RevisionRepuesto,
  typeof RevisionRepuesto.prototype.id,
  RevisionRepuestoRelations
> {
  constructor(
    @inject('datasources.dbImpresoras3d') dataSource: DbImpresoras3DDataSource,
  ) {
    super(RevisionRepuesto, dataSource);
  }
}
