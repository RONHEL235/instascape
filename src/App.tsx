import { Routes, Route } from 'react-router-dom';

import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import { Home } from './_root/pages';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        //Public routes 
        <Route path ="/sign-in" element={<SigninForm />} />
        //Private Routes
        <Route index element={<Home />} />
      </Routes>
    </main>
  )
}

export default App