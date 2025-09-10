import type { Request, Response } from "express"
import Project from "../models/Proyect"
import Task from "../models/Task"

export class ProjectController {
    
    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)

        // Asignar un manager
        project.manager = req.user.id

        try {
            await project.save()
            res.send('Proyecto Creado Correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: {$in: req.user.id} },
                    { team: {$in: req.user.id} }
                ]
            })
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectById = async (req: Request, res: Response) => {

        const { id } = req.params

        try {
            const project = await Project.findById(id).populate('tasks')

            if(!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }

            if(project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id) ) {
                const error = new Error('Acción No Válida')
                return res.status(404).json({ error: error.message })
            }

            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {

        const { project } = req

        try {

            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description

            await project.save()
            res.send('Proyecto Actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {

        const { project } = req

        try {

            await project.deleteOne()

            res.send('Proyecto Eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}