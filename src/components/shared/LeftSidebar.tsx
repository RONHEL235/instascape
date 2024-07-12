import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

const LeftSidebar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const navigate = useNavigate()
    const { user } = useUserContext()

    useEffect(() => {
        if (isSuccess) navigate(0)     
    }, [isSuccess])

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

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
        <img 
          src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
          alt="profile"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col">
          <p className="body-bold">
            {user.name}
          </p> 
          <p className="small-regular text-light-3">
            @ {user.username}
          </p>
        </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li key={link.label} 
              className="leftsidebar-link">
                <NavLink
                 to={link.route}
                 className="flex gap-4 items-center p-4"
                >
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default LeftSidebar