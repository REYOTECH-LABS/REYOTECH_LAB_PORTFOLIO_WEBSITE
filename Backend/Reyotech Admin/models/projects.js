import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    stack: [String],
    brief: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
