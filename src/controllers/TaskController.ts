import type { Request, Response } from "express"
import Task from "../models/Task"
import Note from "../models/Note"

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        const { project } = req

        try {
            const task = new Task(req.body)
            task.project = project.id

            project.tasks.push(task.id)

            await Promise.allSettled([
                task.save(), 
                project.save()
            ]) // Se hace un arreglo de promesas

            res.send('Tarea creada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {

        const { project } = req

        try {
            const tasks = await Task.find({
                project: project.id
            }).populate('project') // Se le pone el nombre del atributo del modelo NO EL DE LA TABLA DE LA DB
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.task.id)
                .populate({
                    path: 'completedBy.user',
                    select: 'id name email'
                })
                .populate({
                    path: 'notes',
                    populate: {
                        path: 'createdBy',
                        select: 'id name email'
                    }
                })

            res.json(task)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            const { task } = req

            task.name = req.body.name
            task.description = req.body.description

            await task.save()

            res.send('Tarea Actualizada Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { task } = req
            
            req.project.tasks = req.project.tasks.filter( taskId => taskId.toString() !== task.id)

            await Promise.allSettled([
                req.project.save(),
                task.deleteOne()
            ])

            res.send('Tarea Eliminada Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {

            const { task } = req
            
            const { status } = req.body
            task.status = status
            
            const data = {
                user: req.user.id,
                status
            }

            task.completedBy.push(data)
            await task.save()

            res.send('Status Actualizado Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
}