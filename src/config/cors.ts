import { CorsOptions } from "cors"
import { Error } from "mongoose"

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        
        const whitelist = [process.env.FRONTEND_URL]

        if(process.argv[2] === '--api') { // Con argv obtenemos todos los argumentos del script ejecutado, entonces, si tiene ese --api
            whitelist.push(undefined)   // Le agregamos a la whitelist el undefined que es lo que nos regresa el "origin" cuando trabajamos con POSTMAN
        }

        if(whitelist.includes(origin)) { // Si el origen es una URL de nuetra whitelist, le permitirmos el acceso
            callback(null, true) // El null es un error, el true es si permitimos el acceso
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}