import mongoose from 'mongoose'
import AdminSchema from '../schemas/admin'

export default mongoose.model('Admin', AdminSchema)
