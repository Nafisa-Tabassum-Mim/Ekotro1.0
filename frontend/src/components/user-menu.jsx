import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavLink, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export default function UserMenu({ token }) {
  const navigate = useNavigate()

  if (!token) return null;

  const decoded = jwtDecode(token);
  const role = decoded.role;
  const name = decoded.name;
  const email = decoded.email;

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    navigate('/login')

  }

  const renderMenuByRole = () => {
    switch (role) {
      case "admin":
        return (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" /> 
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon size={16} className="opacity-60" /> Create Event
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpenIcon size={16} className="opacity-60" /> Notification
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PinIcon size={16} className="opacity-60" /> Add Internship
            </DropdownMenuItem>
          </DropdownMenuGroup>
        );

      case "student_ambassador":
        return (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" />  <NavLink to="/user_profile">Profile</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon size={16} className="opacity-60" /> Create Event
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PinIcon size={16} className="opacity-60" /> All Event
            </DropdownMenuItem>
          </DropdownMenuGroup>
        );

      case "student":
        return (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" /> <NavLink to="/student_profile">Profile</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" /> <NavLink to="/apply_sa">Apply for SA</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon size={16} className="opacity-60" /> Event Wishlist
            </DropdownMenuItem>
          </DropdownMenuGroup>
        );

      case "company":
        return (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" /> <NavLink to="/company_profile">Profile</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon size={16} className="opacity-60" /> Create Internship
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon size={16} className="opacity-60" /> All Internship
            </DropdownMenuItem>
          </DropdownMenuGroup>
        );

      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex flex-col min-w-0">
          <span className="text-foreground truncate text-sm font-medium">
           {name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
          {email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {renderMenuByRole()}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}