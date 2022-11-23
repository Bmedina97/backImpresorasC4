import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbImpresoras3DDataSource} from '../datasources';
import {Repuesto, RepuestoRelations} from '../models';

export class RepuestoRepository extends DefaultCrudRepository<
  Repuesto,
  typeof Repuesto.prototype.id,
  RepuestoRelations
> {
  constructor(
    @inject('datasources.dbImpresoras3d') dataSource: DbImpresoras3DDataSource,
  ) {
    super(Repuesto, dataSource);
  }
}
