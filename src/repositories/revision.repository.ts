import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbImpresoras3DDataSource} from '../datasources';
import {Revision, RevisionRelations, Impresora, Usuario, Repuesto, RevisionRepuesto} from '../models';
import {ImpresoraRepository} from './impresora.repository';
import {UsuarioRepository} from './usuario.repository';
import {RevisionRepuestoRepository} from './revision-repuesto.repository';
import {RepuestoRepository} from './repuesto.repository';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype.id,
  RevisionRelations
> {

  public readonly impresora: BelongsToAccessor<Impresora, typeof Revision.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Revision.prototype.id>;

  public readonly repuestos: HasManyThroughRepositoryFactory<Repuesto, typeof Repuesto.prototype.id,
          RevisionRepuesto,
          typeof Revision.prototype.id
        >;

  constructor(
    @inject('datasources.dbImpresoras3d') dataSource: DbImpresoras3DDataSource, @repository.getter('ImpresoraRepository') protected impresoraRepositoryGetter: Getter<ImpresoraRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('RevisionRepuestoRepository') protected revisionRepuestoRepositoryGetter: Getter<RevisionRepuestoRepository>, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>,
  ) {
    super(Revision, dataSource);
    this.repuestos = this.createHasManyThroughRepositoryFactoryFor('repuestos', repuestoRepositoryGetter, revisionRepuestoRepositoryGetter,);
    this.registerInclusionResolver('repuestos', this.repuestos.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.impresora = this.createBelongsToAccessorFor('impresora', impresoraRepositoryGetter,);
    this.registerInclusionResolver('impresora', this.impresora.inclusionResolver);
  }
}
