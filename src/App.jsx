import React, { useState } from 'react';
import Navbar from './assets/components/Navbar';
import About from './assets/pages/About';
import  Contact  from './assets/pages/Contact';
import Home from './assets/pages/Home';
import Howitworks from './assets/pages/Howitworks';
import Login from './assets/pages/Login';
import Quiz from './assets/pages/Quiz';
import Signup from './assets/pages/Signup';
import Footer from './assets/components/Footer';
import Result from './assets/components/Result';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Scrolltotop from './assets/components/Scrolltotop';
// Question dataset defined above

function App(){
  return(
    <div>
    
      <Scrolltotop/>
      <Navbar/>
      <main className='flex-1'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/howitworks" element={<Howitworks/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/result" element={<Result/>}/>
        
      </Routes>
      </main>
       <Footer/>

    
    </div>
  );
}

export default App;
