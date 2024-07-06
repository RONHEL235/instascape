import { Outlet, Navigate } from "react-router-dom"

  const AuthLayout = () => {
    const isAuthenticated = false;
  

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" /> 
      ): (
        <>
        <img
            src="/assets/images/sign-up-wallpaper.jpg" 
            alt="Wallpaper"
            className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
          />
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </>
   )
}

export default AuthLayout