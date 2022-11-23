import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import PBT from "parse-bearer-token";
import { AuthenticationService } from "../services";

export class StrategySuper implements AuthenticationStrategy{
    name: string = 'Super';

    constructor(
        @service (AuthenticationService)
        public authenticationService : AuthenticationService
    ){

    }
    async authenticate( request: Request) : Promise<UserProfile | undefined> {       
        let token = PBT(request);  
        if (token){ 
                
            let valido = this.authenticationService.ValidarTokerJWT(token);
 

            if (valido){
                
                console.log(valido);
                //let descriptado = this.authenticationService.desencriptarObjeto( valido.toString() );
                //console.log(descriptado);

                let userProfile : UserProfile = Object.assign({
                    data : valido
                });    
                return userProfile;            
            }else{
                throw new HttpErrors[401]("el token no es valido");
            }
        }else{
            throw new HttpErrors[401]("No se ha incluido un token en la solicitud");
        }

        
    }

}