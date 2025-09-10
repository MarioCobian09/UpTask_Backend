import type { Request, Response, NextFunction } from "express"
import Project, { IProject } from "../models/Proyect"


// Para añadir un nuevo campo o atributo a algo ya definido como lo es Request necesitamos agregarle al campo
// para ello rescribimos el Request de express y le añadimos un nuevo campo, es decir, el project
// Usamo interface por que al existir un interface del MISMO NOMBRE solo añade ese nuevo atributo, no lo reescribe
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function projectExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)
        if(!project) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({ error: error.message })
        }
        req.project = project
        next()
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }
}