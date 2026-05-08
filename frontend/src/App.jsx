import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Process from './pages/Process'
import ServicesPage from './pages/ServicesPage'
import Portfolio from './pages/Portfolio'
import Career from './pages/Career'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Overview from './components/Admin/views/Overview'
import ManageServices from './components/Admin/views/ManageServices'
import ManageProjects from './components/Admin/views/ManageProjects'
import Inquiries from './components/Admin/views/Inquiries'
import Auth from './pages/Auth'

function App () {
  return (
    <div className='min-h-screen flex flex-col'>
      <ScrollToTop />
      <Navbar />
      <div className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/process' element={<Process />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/admin' element={<Admin />}>
          
            <Route index element={<Overview />} />
            <Route path='services' element={<ManageServices />} />
            <Route path='projects' element={<ManageProjects />} />
            <Route path='inquiries' element={<Inquiries />} />
          </Route>

          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
