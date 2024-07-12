import { Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages'
import './globals.css'
import RootLayout from './_root/RootLayout'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        //Public routes
        <Route element={<AuthLayout />}>
          <Route path ="/sign-in" element={<SigninForm />} />
          <Route path ="/sign-up" element={<SignupForm />} />
        </Route> 
        //Private Routes
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App