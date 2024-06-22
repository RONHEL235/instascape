import { Section } from "lucide-react";
import { Outlet, Navigate } from "react-router-dom"

  const AuthLayout = () => {
    const isAuthenticated = false;
  

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" /> 
      ): (
        <>
          <Section>
            <Outlet />
          </Section>
        </>
      )}
    </>
   )
}

export default AuthLayout