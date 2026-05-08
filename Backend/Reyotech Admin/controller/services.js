import ServiceCategory from '../models/serviceCategory.js'
import Service from '../models/service.js'

// ─── CATEGORIES ─────────────────────────────
export async function fetchCategories(req, res, next) {
  try {
    const categories = await ServiceCategory.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, categories })
  } catch (error) {
    next(error)
  }
}

export async function addCategory(req, res, next) {
  try {
    const { icon, label, tagline, desc } = req.body
    if (!icon || !label || !tagline || !desc) {
      return res.status(400).json({ success: false, message: 'Icon, label, tagline, and desc are required' })
    }
    const category = await ServiceCategory.create({ icon, label, tagline, desc })
    res.status(201).json({ success: true, message: 'Category created', category })
  } catch (error) {
    next(error)
  }
}

export async function editCategory(req, res, next) {
  try {
    const { id } = req.params
    const { icon, label, tagline, desc } = req.body
    const category = await ServiceCategory.findByIdAndUpdate(
      id,
      { ...(icon !== undefined && { icon }), ...(label !== undefined && { label }),
        ...(tagline !== undefined && { tagline }), ...(desc !== undefined && { desc }) },
      { new: true }
    )
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    res.status(200).json({ success: true, message: 'Category updated', category })
  } catch (error) {
    next(error)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params
    const category = await ServiceCategory.findByIdAndDelete(id)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    await Service.deleteMany({ categoryId: id })
    res.status(200).json({ success: true, message: 'Category and its services deleted' })
  } catch (error) {
    next(error)
  }
}

// ─── SERVICES (flat, independent routes) ─────
export async function fetchServices(req, res, next) {
  try {
    const { categoryId } = req.query
    const filter = categoryId ? { categoryId } : {}
    const services = await Service.find(filter).sort({ createdAt: -1 })
    res.status(200).json({ success: true, services })
  } catch (error) {
    next(error)
  }
}

export async function addService(req, res, next) {
  try {
    const { categoryId, name, desc, highlights } = req.body
    if (!categoryId || !name || !desc) {
      return res.status(400).json({ success: false, message: 'categoryId, name, and desc are required' })
    }
    const category = await ServiceCategory.findById(categoryId)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    const service = await Service.create({ categoryId, name, desc, highlights: highlights || [] })
    res.status(201).json({ success: true, message: 'Service created', service })
  } catch (error) {
    next(error)
  }
}

export async function editService(req, res, next) {
  try {
    const { id } = req.params
    const { name, desc, highlights } = req.body
    const service = await Service.findByIdAndUpdate(
      id,
      { ...(name !== undefined && { name }), ...(desc !== undefined && { desc }),
        ...(highlights !== undefined && { highlights }) },
      { new: true }
    )
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' })
    res.status(200).json({ success: true, message: 'Service updated', service })
  } catch (error) {
    next(error)
  }
}

export async function deleteService(req, res, next) {
  try {
    const { id } = req.params
    const service = await Service.findByIdAndDelete(id)
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' })
    res.status(200).json({ success: true, message: 'Service deleted' })
  } catch (error) {
    next(error)
  }
}
