import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'
import AdminSession from '../models/adminSession.js'
import {
  validateSignup,
  validateLogin,
  handleValidationErrors
} from '../middleware/validation.js'
import { login, register } from '../controller/auth.js'
import {
  fetchProjects,
  addProject,
  editProject,
  deleteProject
} from '../controller/products.js'

const router = express.Router()

router.post('/signup', validateSignup, handleValidationErrors, register)

router.post('/login', validateLogin, handleValidationErrors, login)

router.get('/projects', fetchProjects)
router.post('/projects', addProject)
router.put('/projects/:id', editProject)
router.delete('/projects/:id', deleteProject)

router.post('/logout', async (req, res) => {
  try {
    const token =
      req.cookies.authToken || req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'No session token found'
      })
    }

    // Delete only the active session with matching token
    const sessionDeleted = await AdminSession.deleteOne({
      token: token.substring(0, 50),
      isActive: true
    })

    // Clear the cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    })
  }
})

export default router
