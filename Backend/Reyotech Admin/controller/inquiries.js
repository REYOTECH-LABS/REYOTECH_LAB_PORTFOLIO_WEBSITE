import Message from '../models/message.js'

export async function fetchInquiries(req, res, next) {
  try {
    const inquiries = await Message.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, inquiries })
  } catch (error) {
    next(error)
  }
}

export async function markInquiryRead(req, res, next) {
  try {
    const { id } = req.params
    const inquiry = await Message.findByIdAndUpdate(
      id,
      { status: 'read' },
      { new: true }
    )
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }
    res.status(200).json({ success: true, message: 'Inquiry marked as read', inquiry })
  } catch (error) {
    next(error)
  }
}

export async function deleteInquiry(req, res, next) {
  try {
    const { id } = req.params
    const inquiry = await Message.findByIdAndDelete(id)
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' })
  } catch (error) {
    next(error)
  }
}
