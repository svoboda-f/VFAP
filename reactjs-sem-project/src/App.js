import React from "react";
import './App.css';

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import About from "./About";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calculator from "./Calculator";
import Diary from "./Diary";
import Profile from "./Profile";

function App() {
    // let user = {id: 1, username: 'filipsvoboda', firstName: 'Filip', lastName: 'Svoboda'};
    let user = undefined;
  return (
    <div>
        <BrowserRouter>
            <Navbar user={user}/>
            <Routes>
                <Route exact path={'/'} element={<About/>}/>
                <Route path={'/calculator'} element={<Calculator/>}/>
                <Route path={'/diary'} element={user ? <Diary user={user}/> : <Navigate to={'/'}/>}/>
                <Route path={'/profile'} element={user ? <Profile user={user}/> : <Navigate to={'/'}/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
