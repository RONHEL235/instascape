import React from 'react'
import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
        <img 
          src="/assets/images/InstascapeLogo.svg"
          alt="logo"
          width={90}
          height={10}
        />
        </Link>
      </div>
    </nav>
  )
}

export default LeftSidebar