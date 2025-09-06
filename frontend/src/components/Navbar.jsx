import InfoMenu from "@/components/info-menu"
import Logo from "@/components/logo"
import NotificationMenu from "@/components/notification-menu"
import UserMenu from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { NavLink } from "react-router-dom"
import { jwtDecode } from "jwt-decode";



// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/upcoming_event", label: "Upcoming event" },
  { href: "/internship", label: "Internship" },
  { href: "#", label: "Funding" },
  { href: "#", label: "About" },
]

export default function Navbar() {

  const token = localStorage.getItem("access-token");
  if (token) {
    const decoded = jwtDecode(token);
    // console.log(decoded.role);
    // console.log(decoded.public_id);
  } else {
    console.log("No token found");
  }

  return (
    <header className=" px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink href={link.href} className="py-1.5">
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
         <NavLink to='/'>   <p className="story-script-regular text-white font-semibold raleway text-4xl hover: ">
              <a className="text-[#3b82f6] ">
                EKO
              </a><a className="text-[#bcacd8]">TRO1.0</a>
            </p></NavLink>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className=" text-white font-serif text-xl  raleway hover:text-primary py-1.5 ">
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
          </div>
          {/* User menu */}
          {!token ? (
            <NavLink to="/login">
              <Button className='bg-gradient-to-r p-6 text-lg  from-[#5c34a0] via-[#3b82f6] to-[#9baee2] '>GET STARTED</Button>
            </NavLink>
          ) : (
            <UserMenu token={token} />
          )}

        </div>
      </div>
    </header>
  );
}
