import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import PoetryApp from '../pages/PoetryApp'
import PoemPage from '../pages/PoemPage'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/poems' element={<PoetryApp />} />
      <Route path='/poem/:slug' element={<PoemPage />} />
    </Routes>
  )
}