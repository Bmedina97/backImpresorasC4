import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import generatePassword from 'password-generator';
import CryptoJS from 'crypto-js';
import { environment } from '../config/environment';
import { Usuario, Login } from '../models';
import { UsuarioRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { ControllerRoute } from '@loopback/rest';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import { env } from 'process';

@injectable({scope: BindingScope.TRANSIENT})

export class AuthenticationService {

  //Variables de entorno Twilio de la clase environment
  client = twilio(environment.accountSidTwlio, environment.authTokenTwilio);

  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
  ) {
    sgMail.setApiKey(environment.apiKeySengrid)
  }

  encriptar(password : string){
    let encriptado = CryptoJS.AES.encrypt( password, environment.secretKeyAES).toString();
    return encriptado;
  }

  desencriptar(password : string){
    let bytes  = CryptoJS.AES.decrypt( password, environment.secretKeyAES);
    let desencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return desencriptado;
  }

  encriptarObjeto( data : any){
    let encriptado = CryptoJS.AES.encrypt( JSON.stringify( data ), environment.secretKeyAES).toString();
    return encriptado;
  }

  desencriptarObjeto( data : string){
    let bytes  = CryptoJS.AES.decrypt( data, environment.secretKeyAES);
    let desencriptado = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return desencriptado;
  }

  async loginAsync (email : string, password : string){

    try {
      
      let usuario = await this.usuarioRepository.findOne({
        where : { email : email }
      });

      if( usuario != null ){

        let desencriptado = this.desencriptar( usuario.password );

        if( desencriptado == password ){
          return usuario;
        }else{
          return false;
        }

      }else{
        return false;
      }
      
    } catch (error) {
      return false;
    }
  }

  GenerarTokenJWTEncriptado( usuario : Usuario){
    let datos = {
      nombre : usuario.nombre,
      apellido : usuario.apellidos,
      id : usuario.id,
    } 

    let encriptado =  this.encriptar( JSON.stringify(datos) );

    let token = jwt.sign( {
      data : encriptado
    }, environment.secretJWT, 
    { expiresIn: 60 * 60 * 24});

    return token;
  }

  ValidarTokerJWT( token : string){    
    try {
      let valido = jwt.verify( token, environment.secretJWT);
      return valido;  
    } catch (error) {
      return false;
    }
    
  }

  EnviarSMS (mensaje : string, numberToTwilio : string){

    this.client.messages

    .create({
      body: mensaje, 
      from: environment.numberFromTwilio, 
      to: numberToTwilio
    })
            
    .then( (message : any) => {
      console.log(message.sid);
      return message.sid;
    });    
  }

  EnviarEMail (to : string, subject : string, message : string) {
    const msg = {
      to: to,
      from: environment.senderSengrid,
      subject: subject,
      text: message,
      html: message,
    }

    sgMail
      .send(msg)

      .then(() => {
        console.log('Email enviado correctamente')
      })

      .catch((error : any) => {
        console.error(error)
      })
    
    /* 
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey('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')
    const msg = {
      to: 'brandon_mediina@hotmail.com', // Change to your recipient
      from: 'mocicrugropro-4375@yopmail.com', // Change to your verified sender
      subject: 'Email de Prueba Equipo 02',
      text: 'Este es un correo de prueba del Equipo 02 del Grupo G40',
      html: '<strong>Este es un correo de prueba del Equipo 02 del Grupo G40</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error : any) => {
        console.error(error)
      })
      */
  }
}
