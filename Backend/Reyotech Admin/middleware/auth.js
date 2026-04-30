import jwt from 'jsonwebtoken'
import AdminSession from '../models/adminSession.js'
import UAParser from 'ua-parser-js'

const { ACCESS_SECRET, REFRESH_SECRET } = process.env

export async function authenticate (req, res, next) {
  const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({ code: 'NO_TOKEN' })
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET)

    const session = await AdminSession.findOne({
      adminId: decoded.sub,
      isActive: true,
      expiresAt: { $gt: new Date() }
    })

    if (!session) {
      return res.status(401).json({ code: 'SESSION_REVOKED' })
    }

    req.user = decoded
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ code: 'TOKEN_EXPIRED' })
    }
    return res.status(401).json({ code: 'INVALID_TOKEN' })
  }
}

export async function refreshAuth (req, res) {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ code: 'NO_REFRESH_TOKEN' })
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET)

    const session = await AdminSession.findOne({
      token: refreshToken,
      isActive: true
    })

    if (!session) {
      return res.status(401).json({ code: 'SESSION_NOT_FOUND' })
    }

    const payload = { sub: decoded.sub, role: decoded.role }
    const newAccessToken = jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: '15m'
    })
    const newRefreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: '7d'
    })

    await AdminSession.updateOne(
      { _id: session._id },
      {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    )

    res.cookie('refreshToken', newRefreshToken, { httpOnly: true })
    res.json({ accessToken: newAccessToken })
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      await AdminSession.deleteOne({ token: refreshToken })
      return res.status(401).json({ code: 'REFRESH_EXPIRED' })
    }
    return res.status(401).json({ code: 'INVALID_REFRESH_TOKEN' })
  }
}

export async function revokeAllSessions (req, res) {
  const { adminId } = req.user

  await AdminSession.deleteMany({ adminId })

  res.clearCookie('refreshToken')
  res.json({ message: 'All sessions revoked' })
}
