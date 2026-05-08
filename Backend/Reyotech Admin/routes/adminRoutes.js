import express from 'express'
import { validateSignup, validateLogin, handleValidationErrors } from '../middleware/validation.js'
import { authenticate, refreshAuth } from '../middleware/auth.js'
import { login, register, logout } from '../controller/auth.js'
import { fetchProjects, addProject, editProject, deleteProject } from '../controller/products.js'
import { fetchInquiries, markInquiryRead, deleteInquiry } from '../controller/inquiries.js'
import { fetchCategories, addCategory, editCategory, deleteCategory, fetchServices, addService, editService, deleteService } from '../controller/services.js'

const router = express.Router()

router.post('/signup', validateSignup, handleValidationErrors, register)
router.post('/login', validateLogin, handleValidationErrors, login)
router.post('/logout', logout)
router.post('/refresh', refreshAuth)

router.get('/projects',  fetchProjects)
router.post('/projects', authenticate, addProject)
router.put('/projects/:id', authenticate, editProject)
router.delete('/projects/:id', authenticate, deleteProject)

router.get('/inquiries', authenticate, fetchInquiries)
router.patch('/inquiries/:id/read', authenticate, markInquiryRead)
router.delete('/inquiries/:id', authenticate, deleteInquiry)

router.get('/categories',  fetchCategories)
router.post('/categories', authenticate, addCategory)
router.put('/categories/:id', authenticate, editCategory)
router.delete('/categories/:id', authenticate, deleteCategory)

router.get('/services',  fetchServices)
router.post('/services', authenticate, addService)
router.put('/services/:id', authenticate, editService)
router.delete('/services/:id', authenticate, deleteService)

export default router
