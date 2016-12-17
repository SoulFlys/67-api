import mongoose from 'mongoose'
import ArtSchema from '../schemas/article'

export default mongoose.model('Article', ArtSchema)
