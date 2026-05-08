import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import path from 'path'
import connectDB from './config/db.js'
import adminRoutes from './routes/adminRoutes.js'
import ServiceCategory from './models/serviceCategory.js'
import Service from './models/service.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB().then(async () => {
  const catCount = await ServiceCategory.countDocuments()
  if (catCount === 0) {
    const categories = await ServiceCategory.insertMany([
      { icon: 'Code', label: 'Engineering', tagline: 'Robust. Scalable. Future-Proof.', desc: 'We architect and build high-performance digital products — from enterprise web platforms to complex backend systems.' },
      { icon: 'Palette', label: 'Design', tagline: 'Beautiful. Intuitive. Memorable.', desc: 'Our design practice merges aesthetics with strategy — creating visual experiences that engage, convert, and delight.' },
      { icon: 'Zap', label: 'Strategy', tagline: 'Smart. Adaptive. Data-Driven.', desc: 'We help businesses navigate digital transformation with clarity — from AI integration to strategic tech consulting.' }
    ])
    console.log('Seeded default service categories')

    const svcCount = await Service.countDocuments()
    if (svcCount === 0) {
      const [eng, des, str] = categories
      await Service.insertMany([
        { categoryId: eng._id, name: 'Enterprise Web Apps', desc: 'Full-stack solutions built for performance and scale.', highlights: ['React / Next.js', 'Node.js / Django', 'REST & GraphQL APIs'] },
        { categoryId: eng._id, name: 'Mobile Development', desc: 'Native iOS & Android apps with seamless UX.', highlights: ['React Native', 'Flutter', 'App Store Deployment'] },
        { categoryId: eng._id, name: 'Cloud Solutions', desc: 'Secure, scalable cloud infrastructure and DevOps.', highlights: ['AWS / GCP / Azure', 'CI/CD Pipelines', 'Kubernetes & Docker'] },
        { categoryId: des._id, name: 'UI/UX Design', desc: 'User-centered interfaces that drive engagement.', highlights: ['Figma Prototypes', 'User Research', 'Accessibility'] },
        { categoryId: des._id, name: 'Graphic Production', desc: 'Premium visual assets for every platform.', highlights: ['Motion Graphics', 'Social Media', 'Print & Digital', 'Flyer design'] },
        { categoryId: des._id, name: 'Brand Identity', desc: 'Strategic brand systems that define who you are.', highlights: ['Logo & Identity', 'Brand Guidelines', 'Tone of Voice'] },
        { categoryId: str._id, name: 'Digital Transformation', desc: 'Modernizing your business with technology.', highlights: ['Process Automation', 'Legacy Migration', 'Digital Audit'] },
        { categoryId: str._id, name: 'AI Integration', desc: 'Next-gen intelligence built into your products.', highlights: ['LLM Integration', 'Computer Vision', 'Data Pipelines'] },
        { categoryId: str._id, name: 'Consultancy', desc: 'Expert guidance on your technology roadmap.', highlights: ['Tech Strategy', 'Architecture Review', 'Vendor Selection'] }
      ])
      console.log('Seeded default services')
    }
  }
})

app.use('/api/admin', adminRoutes)

const PORT = process.env.ADMIN_PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
