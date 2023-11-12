import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from "./components/nav/Nav";
import Landing from './views/landing/Landing';
import Home from "./views/home/Home";
import Form from "./views/form/Form";
import Generator from "./views/generator/Generator";
import Detail from "./views/detail/Detail";
import Error404 from "./views/error/Error404";
import './App.css'

function App() {
  const location = useLocation()
  return (
    <>
      {/* Siempre que no este en la pagina principal, enseña menú */}
      {location.pathname !== "/" && (
        <Nav />
      )}

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form/:id?' element={<Form />} />
        <Route path='/generator' element={<Generator />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='*' element={<Error404 />} />
      </Routes> 
    </>
  )
}

export default App
