import { Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage.jsx'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<MenuPage />} />
      </Routes>
    </div>
  )
}

export default App
