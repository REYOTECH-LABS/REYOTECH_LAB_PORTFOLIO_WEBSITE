import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, uppercase: true },
    image: { type: String, required: true, trim: true },
    tags: [String],
    desc: { type: String, required: true, trim: true },
    color: { type: String, default: 'from-brand-teal/20 to-brand-dark/5' },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
