import adminSession from '../models/adminSession.js'
import admin from '../models/admin.js'
import { UAParser } from 'ua-parser-js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function logout (req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken
    if (refreshToken) {
      await adminSession.deleteOne({ token: refreshToken })
    }
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.json({ message: 'Logged out' })
  } catch (error) {
    next(error)
  }
}

export async function login (req, res, next) {
  try {
    const { email, password } = req.body

    const Admin = await admin.findOne({ email: email })

    if (!Admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    if (Admin.status !== 'active') {
      const statusMessages = {
        deactivated:
          'Your account has been deactivated. Please contact support.',
        suspended: 'Your account has been suspended. Please contact support.',
        deleted: 'Your account has been deleted.'
      }
      return res.status(403).json({
        success: false,
        message:
          statusMessages[Admin.status] || 'You are not permitted to login.'
      })
    }

    const isPasswordValid = await bcrypt.compare(password, Admin.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const parser = new UAParser()
    const ua = parser.setUA(req.headers['user-agent']).getResult()

    const ipAddress =
      req.ip ||
      req.connection.remoteAddress ||
      req.headers['x-forwarded-for'] ||
      'Unknown IP'

    const payload = { sub: Admin.id, role: 'admin' }

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' })

    const adminRecord = await adminSession.findOne({
      adminId: Admin.id
    })
    if (adminRecord) {
      await adminRecord.updateOne({
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
    } else {
      await adminSession.create({
        adminId: Admin.id,
        token: refreshToken,
        deviceInfo: `${ua.browser.name} on ${ua.os.name}`,
        ipAddress: ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
    }

    const cookieOpts = { httpOnly: true, secure: process.env.NODE_ENV === 'production' }

    res.cookie('refreshToken', refreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.cookie('accessToken', accessToken, { ...cookieOpts, sameSite: 'lax', maxAge: 15 * 60 * 1000 })

    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        //Exposing too much here will figure out what frontend actually needs and what goes into other routes
        // id: admin._id,
        name: Admin.name,
        email: Admin.email,
        role: Admin.role
        // department: admin.department,
        // status: admin.status
      }
    })
  } catch (error) {
    next(error)
  }
}

export async function register (req, res, next) {
  try {
    const { email, password, name } = req.body

    const adminExist = await admin.findOne({
      email: email
    })
    if (adminExist) {
      return res.status(409).json({
        status: 'failed',
        message: 'Admin exists ,log in instead'
      })
    }

    const hashedPassowrd = await bcrypt.hash(password, 12)
    const Admin = await admin.create({
      name: name,
      email: email,
      password: hashedPassowrd,
      role: 'admin',
      department: null
    })

    const parser = new UAParser()
    const ua = parser.setUA(req.headers['user-agent']).getResult()

    const ipAddress =
      req.ip ||
      req.connection.remoteAddress ||
      req.headers['x-forwarded-for'] ||
      'Unknown IP'

    const payload = { sub: Admin.id, role: 'admin' }

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' })

    await adminSession.create({
      adminId: Admin.id,
      token: refreshToken,
      deviceInfo: `${ua.browser.name} on ${ua.os.name}`,
      ipAddress: ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    const cookieOpts = { httpOnly: true, secure: process.env.NODE_ENV === 'production' }
    res.cookie('refreshToken', refreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.cookie('accessToken', accessToken, { ...cookieOpts, sameSite: 'lax', maxAge: 15 * 60 * 1000 })

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      admin: {
        //Exposing too much here will figure out what frontend actually needs and what goes into other routes
        // id: admin._id,
        //   id: newAdmin._id,
        name: Admin.name,
        email: Admin.email,
        role: Admin.role
        // department: newAdmin.department,
        // status: newAdmin.status,
        // createdAt: newAdmin.createdAt
      }
    })
  } catch (error) {
    next(error)
  }
}
