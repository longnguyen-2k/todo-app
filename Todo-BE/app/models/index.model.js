import mongoose from 'mongoose';
import Todos from './todo.model.js'

mongoose.Promise= global.Promise

const db = {
    mongoose,
    Todos,
}

export default db;