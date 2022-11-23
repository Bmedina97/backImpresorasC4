import { service } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
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
  HttpErrors,
  stringTypeToWrapper,
} from '@loopback/rest';
import {Usuario, Login} from '../models';
import {UsuarioRepository} from '../repositories';
import { AuthenticationService } from '../services';
import { strict } from 'assert';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,

    @service(AuthenticationService)
    public authenticationService : AuthenticationService,
  ) {}

  @post('/login')
  @response(200, {
    descripcion:'Usuario logueado con exito'
  })
  async login(
    @requestBody() usuarioLogin : Login
  ){
    
    let usuario =  await this.authenticationService.loginAsync( usuarioLogin.email, usuarioLogin.password);
    
    if ( usuario ){

      let token = this.authenticationService.GenerarTokenJWTEncriptado(usuario);

      //this.authenticationService.EnviarEMail();

      /*return {
        data : usuario,
        status : 'OK'
      }*/
      return {
        data : {
          id : usuario.id,
          nombre : usuario.nombre + ' ' + usuario.apellidos,
          correo : usuario.email,
          celular: usuario.telefono,
          rol: usuario.rolId
        },
        token: token
      }
    }else{
      throw new HttpErrors[401]("Los datos ingresados no son validos")
    }
  }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {

    usuario.password = this.authenticationService.encriptar( usuario.password );
    
    //Envio de SMS Confirmacion de registro
    let mensaje ='Su registro en la plataforma fue exitoso!, los datos de acceso fueron enviados a: ' + usuario.email;
    let numberToTwilio = '+57' + usuario.telefono;
    
    //Envio de Email Credenciales de acceso
    let to = usuario.email;
    let subject = 'CONFIRMACION DE CREDENCIALES DE ACCESO A LA PLATAFORMA CORPORATIVA'
    let message = `
    <p>Bienvenido <strong>${usuario.nombre} ${usuario.apellidos}</strong> a la plataforma Corporativa,</p>
    <p>Sus credenciales de acceso a la plataforma son: </p>
    <p><strong>Usuario:</strong> ${usuario.email}</p>
    <p><strong>Contraseña:</strong> ${this.authenticationService.desencriptar(usuario.password)}</p>
    <p>En caso de presentar problemas con el inicio de su sesión por favor comunicarse con el area de Soporte Tecnico:</p>
    <p> <a href="solucionessoporte@gmail.com"> Click aqui para comunicarse con Soporte</a> </p>
    `
    this.authenticationService.EnviarSMS(mensaje, numberToTwilio);

    this.authenticationService.EnviarEMail(to,subject,message);
    
    return this.usuarioRepository.create(usuario);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  //PERMISO SOLO PARA ADMINISTRADOR SUPER
  @authenticate('Super', 'Tecnico')
  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
