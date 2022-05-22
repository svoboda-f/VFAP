import React, {useEffect, useState} from "react";
import './App.css';

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import About from "./About";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calculator from "./Calculator";
import Diary from "./Diary";
import Profile from "./Profile";
import httpClient from "./services/HttpInterceptor";

function App() {
    const [user,setUser] = useState(undefined);

    useEffect(() => {
        httpClient.get("info").then((response) => {
            if(response.data) {
                setUser(response.data);
            }

        }).catch();
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Navbar user={user} setUser={setUser}/>
                <Routes>
                    <Route exact path={'/'} element={<About/>}/>
                    <Route path={'/calculator'} element={<Calculator/>}/>
                    <Route path={'/diary'} element={<Diary user={user}/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
