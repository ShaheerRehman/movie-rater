import React, {createContext, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./auth";
import App from "../App";
import {CookiesProvider} from "react-cookie";

export default function Router(){
  // const Token = 'a133158a036b647ba09191b94d6661c9e67f38c9'
  return(
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Auth/>}/>
            <Route path='/movies' element={<App/>}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
  </React.StrictMode>
  )
}