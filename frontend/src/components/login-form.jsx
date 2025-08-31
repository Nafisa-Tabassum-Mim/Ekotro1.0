import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink } from "react-router-dom"

export default function LoginForm({
  handleLogin,
  className,
  error,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-[#5c34a0] text-2xl'>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              {/* email  */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="text" placeholder="m@example.com" required />
              </div>
              {/* password  */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm  ">
                  {error}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>

              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <NavLink className="text-[#673ab7]" to="/register">Sign up</NavLink>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
