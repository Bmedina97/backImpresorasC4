import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dbImpresoras3d',
  connector: 'mongodb',
  url: 'mongodb+srv://Zeven:PearlJam123456@desarrolloweb.xl78mj8.mongodb.net/G40-G2-Impresoras3D?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbImpresoras3DDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dbImpresoras3d';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dbImpresoras3d', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
