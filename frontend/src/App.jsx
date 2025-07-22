import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'
import HomePage from './HomePage'
import Login from './Login'
import CreateAccount from './CreateAccount'
import Builder from './Builder'
import Index from './Index'
import ItemsPage from './ItemsPage'
import ItemDetails from './ItemDetails'
import CompletedBuilds from './CompletedBuilds'
import Forums from './Forums'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createaccount' element={<CreateAccount />} />
          <Route path='/builder' element={<Builder />} />
          <Route path='/builds' element={<CompletedBuilds />} />
          <Route path='/index' element={<Index />} />
          <Route path="/index/:type" element={<ItemsPage />} />
          <Route path="/index/:type/:id" element={<ItemDetails />} />
          <Route path='/forums' element={<Forums />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}