import mongoose from 'mongoose'
import CategorySchema from '../schemas/category'

export default mongoose.model('Category', CategorySchema)
