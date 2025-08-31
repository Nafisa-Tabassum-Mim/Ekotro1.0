import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Passwordinput from '../../components/passwordinput';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';


const CompanyRegister = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const web_link = e.target.web_link.value

        console.log(name, email, password, web_link)

        const newRegister = { name, email, password, web_link }

        await fetch("http://127.0.0.1:5000/company_register", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newRegister)
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    // handle backend error
                    setError(data.error || "Something went wrong");
                    return;
                }
                // success case
                console.log("✅ Registration successful:", data);
                setError(""); // clear previous error
                localStorage.setItem("access-token", data.token); // <-- store token
                navigate("/");

            })
            .catch(err => {
                console.error(err);
            });
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-[#5c34a0] text-2xl'>Register your company to use our services</CardTitle>
                            <CardDescription>
                                Enter your information below to Register
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegister}>
                                {/* Name */}
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Company name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Company name"
                                            required
                                            name="name"
                                        />
                                    </div>
                                    {/* website link  */}
                                    <div className="grid gap-3">
                                        <Label htmlFor="webLink">Company Website Link</Label>
                                        <Input
                                            id="webLink"
                                            type="url"
                                            placeholder="https://example.com"
                                            name="web_link"
                                            required
                                        />
                                    </div>
                                    {/* Email */}
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Company email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Company email"
                                            required
                                            name="email"
                                        />
                                    </div>
                                    {/* Error Message */}
                                    {error && (
                                        <div className="text-red-600 text-sm  ">
                                            {error}
                                        </div>
                                    )}

                                    {/* Password */}

                                    <Passwordinput></Passwordinput>

                                    {/* Submit Button */}
                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full">
                                            Register
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 text-center text-sm">
                                    Are you a student?{" "}
                                    <NavLink className="text-[#673ab7]" to="/register">Student sign up</NavLink>
                                </div>
                                <div className="mt-2 text-center text-sm">
                                    Already have an account?{" "}
                                    <NavLink className="text-[#673ab7]" to="/login">login</NavLink>
                                </div>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CompanyRegister;