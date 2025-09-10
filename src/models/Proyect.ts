import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose"
import Task, { ITask } from "./Task"
import { IUser } from "./User"
import Note from "./Note"

// Este es de typecript (son diferentes)
export interface IProject extends Document { // Hereda toda la estructura de Document pero nos permite definir la nuestra
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[]  // PopulatedDoc permite relacionar y obtener informacion (como un JOIN), es para definir un SUBDOCUMENTO e indicarle que vamos a guardar manteniendo la herencia de document
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
}

// Esto es para mongoose
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true, // SI se introduce muchos espacios, lo corta
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [                            // Mantenemos un arreglo de IDs de las tareas
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    team: [                            // Mantenemos un arreglo de IDs de las tareas
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
}, {timestamps: true}) // Se almacena cuando se crea o actualiza un registro

// Middleware
ProjectSchema.pre('deleteOne', 
    {
        document: true, // En This nos muestra el documento que vamos a eliminar
        query: false // En el This nos muestra datos de la consulta (por eso lo ponemos false)
    }, 
    async function() {      // Solo podemos acceder al this con este tipo de funciones
        const projectId = this._id
        if(!projectId) return

        const tasks = await Task.find({ project: projectId })
        for(const task of tasks) {
            await Note.deleteMany({ task: task.id })
        }

        await Task.deleteMany({ project: projectId })
    }
)

const Project = mongoose.model<IProject>('Project', ProjectSchema) // Al colocarle el generic nos permite tener referencia de que son cada uno delos atributos del modelo
export default Project