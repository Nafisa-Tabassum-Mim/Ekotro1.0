import  { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaRegUser } from "react-icons/fa";
import { Spinner } from '@/components/ui/shadcn-io/spinner';

const CompanyProfile = () => {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true); // <-- loader state

    
        useEffect(() => {
            const token = localStorage.getItem("access-token");
            if (token) {
                fetch("http://localhost:5000/company_user", {
                    method: "GET",
                    headers: { "token": token },
                })
                    .then((res) => {
                        if (!res.ok) throw new Error("Failed to fetch user");
                        return res.json();
                    })
                    .then((data) => {
                        setUser(data);
                        setLoading(false); // <-- data loaded
                    })
                    .catch((err) => {
                        console.error(err);
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        }, []);
    
        if (loading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner className="w-10 h-10 text-[#5c34a0]" />
                    <span className="ml-2 text-gray-600">Loading user...</span>
                </div>
            );
        }
    
        const updateCompanyInfo = async (e, id) => {
            e.preventDefault()
            const fb_link = e.target.fb_link.value
    
            const NewUserInfo = { fb_link }
    
            await fetch(`http://127.0.0.1:5000/updateCompany/${id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(NewUserInfo)
            })
                .then(async (res) => {
                    const data = await res.json();
                    console.log("✅ user update is successful:", data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    

    return (
        <div className="flex min-h-screen w-full bg-gray-50 p-6">
            <div className="grid w-full gap-6 md:grid-cols-[280px_1fr]">
                {/* Left Sidebar */}
                <Card className="p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600">
                        👤
                    </div>
                    <h2 className="mt-8 text-lg font-semibold">{user.name}</h2>
                    <p className="text-md text-gray-500 break-all">
                        {user.email}
                    </p>
                    <div className="mt-2 w-full">
                        <p className="text-xs font-medium text-gray-600 mb-1">
                            Profile Completeness
                        </p>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div className="w-full h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <p className="text-xs mt-1 text-blue-600 font-medium text-right">
                            100% Complete
                        </p>
                    </div>
                </Card>

                {/* Right Content */}
                <div className="flex flex-col gap-6">
                    {/* Basic Info */}

                    <Card>
                        <form onSubmit={(e) => updateCompanyInfo(e, user.user_id)}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-xl flex items-center gap-2">
                                        <FaRegUser />
                                        <span>Basic Information</span>
                                    </h3>

                                    <Button variant="outline">
                                        Save Changes
                                    </Button>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Company Name</p>
                                        <Input value={user.name} readOnly />
                                    </div>
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Company Email</p>
                                        <Input value={user.email} readOnly />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-md pb-2 font-bold text-gray-700">Company website</p>
                                    <Input
                                        placeholder="Website Link"
                                        defaultValue={user.web_link}
                                        name="uni_name"
                                        readOnly
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="text-md pb-2 font-bold text-gray-700">Company Facebook Page</p>
                                    <Input
                                        defaultValue={user.fb_link}
                                        placeholder="Facebook Page Link"
                                        name="fb_link"
                                    />
                                </div>

                            </CardContent>
                        </form>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;