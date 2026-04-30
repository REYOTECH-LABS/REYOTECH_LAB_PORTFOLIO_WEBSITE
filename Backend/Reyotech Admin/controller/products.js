import Project from '../models/projects.js'

export async function fetchProjects (req, res, next) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      projects
    })
  } catch (error) {
    next(error)
  }
}

export async function addProject (req, res, next) {
  try {
    const { title, category, image, stack, brief } = req.body

    if (!title || !category || !image || !brief) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, image, and brief are required'
      })
    }

    const project = await Project.create({
      title,
      category,
      image,
      stack: stack || [],
      brief
    })

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    })
  } catch (error) {
    next(error)
  }
}

export async function editProject (req, res, next) {
  try {
    const { id } = req.params
    const { title, category, image, stack, brief, status } = req.body

    const project = await Project.findByIdAndUpdate(
      id,
      { title, category, image, stack, brief, status },
      { new: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteProject (req, res, next) {
  try {
    const { id } = req.params

    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
