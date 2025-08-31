import LoginForm from "@/components/login-form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(name, email, password)

        const newRegister = { name, email, password }

        await fetch("http://127.0.0.1:5000/login", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newRegister)
        })
            // .then(res => res.json())
            // .then(data => console.log(data))
            // .catch(err => console.error(err))

            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    // handle backend error
                    setError(data.error || "Something went wrong");
                    return;
                }
                // success case
                console.log("✅ login successful:", data);
                setError(""); // clear previous error
                // Save token in localStorage
                localStorage.setItem("access-token", data.token); // <-- store token

                // Optional: redirect user
                navigate("/");
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm onSubmit={handleLogin} error={error} />

            </div>
        </div>
    )
};

export default Login;