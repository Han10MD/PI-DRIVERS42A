import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import LandingPage from './components/LandingPage/landingPage';
import HomePage from './components/HomePege/homePage';
import DetailPage from './components/DetailPage/detailPage'
import NavBar from './components/NavBar/navBar'
import DriverForm from './components/DriverForm/driverForm'

function App() {

  const { pathname } = useLocation()

  return (
    <div>

      {pathname !== '/' ? <NavBar /> : ''}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/details/:id' element={<DetailPage />} />
        <Route path='/newdriver' element={<DriverForm />} />
      </Routes>

    </div>
  )
}

export default App
