import mongoose from 'mongoose'

const serviceCategorySchema = new mongoose.Schema({
  icon: { type: String, required: true, trim: true },
  label: { type: String, required: true, trim: true },
  tagline: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true }
}, { timestamps: true })

export default mongoose.model('ServiceCategory', serviceCategorySchema)
