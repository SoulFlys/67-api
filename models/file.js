import mongoose from 'mongoose'
import FileSchema from '../schemas/file'

export default mongoose.model('File', FileSchema)
