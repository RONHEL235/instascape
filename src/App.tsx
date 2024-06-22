import { Routes, Route } from 'react-router-dom';

import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import { Home } from './_root/pages';
import './globals.css';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        //Public routes
        <Route element={<AuthLayout />}>
          <Route path ="/sign-in" element={<SigninForm />} />
          <Route path ="/sign-in" element={<SignupForm />} />
        </Route> 
        //Private Routes
        <Route index element={<Home />} />
      </Routes>
    </main>
  )
}

export default App