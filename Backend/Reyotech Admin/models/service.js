import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  name: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true },
  highlights: [String]
}, { timestamps: true })

export default mongoose.model('Service', serviceSchema)
