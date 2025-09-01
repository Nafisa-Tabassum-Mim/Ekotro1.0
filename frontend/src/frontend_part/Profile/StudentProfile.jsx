import  { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaRegUser } from "react-icons/fa";
import { Spinner } from '@/components/ui/shadcn-io/spinner';


const StudentProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // <-- loader state
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            if (type === "front") setFrontPreview(previewUrl);
            else setBackPreview(previewUrl);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (token) {
            fetch("http://localhost:5000/student_user", {
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

    const updateUserInfo = async (e, id) => {
        e.preventDefault()
        const uni_name = e.target.uni_name.value
        const dept = e.target.dept.value
        const fb_link = e.target.fb_link.value
        const front_part = e.target.front_part.files[0]
        const back_part = e.target.back_part.files[0]
        // console.log(id, uni_name, dept, fb_link, front_part, back_part)

        const NewUserInfo = { uni_name, dept, fb_link, front_part, back_part }

        await fetch(`http://127.0.0.1:5000/updateStudent/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(NewUserInfo)
        })
            .then(async (res) => {
                const data = await res.json();
                console.log("✅ Registration successful:", data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    // console.log(user)
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
                    <p className=" text-sm text-gray-600">
                        {user.uni_name}
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
                        <form onSubmit={(e) => updateUserInfo(e, user.user_id)}>
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
                                        <p className="text-md pb-2 font-bold text-gray-700">Full Name</p>
                                        <Input value={user.name} readOnly />
                                    </div>
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Email</p>
                                        <Input value={user.email} readOnly />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-md pb-2 font-bold text-gray-700">University</p>
                                    <Input
                                        placeholder="University name"
                                        defaultValue={user.uni_name}
                                        name="uni_name"
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="text-md pb-2 font-bold text-gray-700">Department</p>
                                    <Input
                                        placeholder="Department name"
                                        defaultValue={user.dept}
                                        name="dept"
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="text-md pb-2 font-bold text-gray-700">Facebook ID</p>
                                    <Input
                                        defaultValue={user.fb_link}
                                        placeholder="Facebook Link"
                                        name="fb_link"
                                    />
                                </div>

                                <div className="flex gap-6">
                                    {/* Front side */}
                                    <div>
                                        <p className="text-md my-2 font-bold text-gray-700">Student ID (Front)</p>
                                        <img
                                            src={frontPreview || user.front_side || "/images/student_id_front_part.png"}
                                            alt="Student ID Front preview"
                                            className="w-64 h-40 mb-2 object-cover rounded-lg border"
                                        />
                                        <label className="flex flex-col items-center px-4 py-2 bg-[#5c34a0] text-white rounded-lg cursor-pointer hover:bg-[#824ae4bf]">
                                            <span>Select Front ID</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                name="front_part"
                                                onChange={(e) => handleFileChange(e, "front")}
                                            />
                                        </label>
                                    </div>

                                    {/* Back side */}
                                    <div>
                                        <p className="text-md my-2 font-bold text-gray-700">Student ID (Back)</p>
                                        <img
                                            src={backPreview || user.back_side || "/images/student_id_front_part.png"}
                                            alt="Student ID Back preview"
                                            className="w-64 h-40 mb-2 object-cover rounded-lg border"
                                        />
                                        <label className="flex flex-col items-center px-4 py-2 bg-[#5c34a0] text-white rounded-lg cursor-pointer hover:bg-[#824ae4bf]">
                                            <span>Select Back ID</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                name="back_part"
                                                onChange={(e) => handleFileChange(e, "back")}
                                            />
                                        </label>
                                    </div>

                                </div>

                            </CardContent>
                        </form>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
