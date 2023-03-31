import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from 'react-router-dom';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Index from './components/home/index';
import Edit from './components/home/edit';
import Add from './components/home/add';
import Error from './components/pageNotFound';
import Birthday from './components/birthday/birthday';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem('Email');
    const password = localStorage.getItem('Password');
    if (!email && !password) {
      navigate('/signup');
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path='/signin' element={<Signin />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/' element={<Index />} />
        <Route exact path='/edit/:id' element={<Edit />} />
        <Route exact path='/add' element={<Add />} />
        <Route exact path='/birthday' element={<Birthday />} />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;