import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/SignUp'
import Login from './components/Login'
import CityList from './components/CityList'
import CityDetail from './components/CityDetail'
import SeatComponent from './components/SeatComponent'
function AppRoutes() {
    return (
      <Routes>
          <Route path={"/"} element={<Signup/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/dashboard"} element={<CityList/>}/>
          <Route path="/city/:cityName" element={<CityDetail/>} />
          <Route path="/seats/:showId" element={<SeatComponent />} />
      </Routes>
    )
  }

export default AppRoutes;