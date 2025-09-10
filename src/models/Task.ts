import mongoose, { Schema, Document, Types } from "mongoose"
import Note from "./Note"

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const  // Solo se puede leer, ya no se puede modificar

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus] // Solo va a aceptar los valores que se tengan en el objeto

export interface ITask extends Document {
    name: string,
    description: string,
    project: Types.ObjectId // Se le define un Type de mongoose
    status: TaskStatus,
    completedBy: {
        user: Types.ObjectId,
        status: TaskStatus
    }[],
    notes: Types.ObjectId[]
}

export const TaskSchema : Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required:true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {                      // Hacemos referencia a un solo proyecto guardando su ID
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    completedBy: [
        {
            user: {
                type: Types.ObjectId,
                ref: 'User',
                default: null
            },
            status: {
                type: String,
                enum: Object.values(taskStatus),
                default: taskStatus.PENDING
            }
        }
    ],
    notes: [
        {
            type: Types.ObjectId,
            ref: 'Note'
        }
    ]
}, {timestamps: true})

// Middleware
TaskSchema.pre('deleteOne', 
    {
        document: true, // En This nos muestra el documento que vamos a eliminar
        query: false // En el This nos muestra datos de la consulta (por eso lo ponemos false)
    }, 
    async function() {      // Solo podemos acceder al this con este tipo de funciones
        const taskId = this._id
        if(!taskId) return
        await Note.deleteMany({ task: taskId })
    }
)

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task