import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaRegUser } from "react-icons/fa";
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useNavigate } from "react-router-dom";

const ApplySaForm = () => {
    const [loading, setLoading] = useState(true); // <-- loader state
    const [user, setUser] = useState(null);
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);
    const [saFormFilled, setSaFormFilled] = useState(false)
    const navigate = useNavigate();

    // Handle image selection
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            if (type === "front") setFrontPreview(previewUrl);
            else setBackPreview(previewUrl);
        }
    };

    // Example: fetching logged-in user info
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

    useEffect(() => {
        if (user?.user_id) {
            fetch(`http://127.0.0.1:5000/checksa/${user.user_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.exists) {
                        setSaFormFilled(true);
                    } else {
                        setSaFormFilled(false);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner className="w-10 h-10 text-[#5c34a0]" />
                <span className="ml-2 text-gray-600">Loading user...</span>
            </div>
        );
    }

    const handleApply = async (e) => {
        // e.preventDefault();

        const uni_name = e.target.uni_name.value;
        const dept = e.target.dept.value;
        const fb_link = e.target.fb_link.value;
        const club_name = e.target.club_name.value;
        const club_position = e.target.club_position.value;
        const uni_weblink = e.target.uni_weblink.value;
        const front_part = e.target.front_part.files[0];
        const back_part = e.target.back_part.files[0];

        // ✅ Step 1: Update student info first
        const NewUserInfo = { uni_name, dept, fb_link, front_part, back_part };

        try {
            const updateRes = await fetch(`http://127.0.0.1:5000/updateStudent/${user.user_id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(NewUserInfo),
            });

            const updateData = await updateRes.json();
            console.log("✅ Student Info Updated:", updateData);

            // ✅ Step 2: Apply for ambassador
            const NewApplication = { fb_link, uni_name, dept, front_part, back_part, club_name, club_position, uni_weblink };

            const applyRes = await fetch(`http://127.0.0.1:5000/applyAmbassador/${user.user_id}`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(NewApplication),
            });

            const applyData = await applyRes.json();
            console.log("🎉 Application Submitted:", applyData);

        } catch (err) {
            console.error("❌ Error in submission:", err);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
            {saFormFilled ? (
                <div className="text-xl font-semibold text-gray-700 flex flex-col items-center gap-4">
                    <p>You have already applied for the Student Internship</p>
                    <Button onClick={() => navigate("/")}>
                        Go Back
                    </Button>
                </div>

            ) : (
                <div className="w-full max-w-4xl">
                    <h1 className="text-2xl font-bold text-center text-[#5c34a0] mb-6">
                        Apply for Student Ambassador for your Univesity
                    </h1>

                    <Card>
                        <form onSubmit={handleApply}>
                            <CardContent className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-xl flex items-center gap-2">
                                        <FaRegUser />
                                        <span>Basic Information</span>
                                    </h3>
                                    <Button type="submit" className="bg-[#5c34a0] hover:bg-[#824ae4]">
                                    Submit Application
                                </Button>
                                </div>

                                {/* Info fields */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Full Name</p>
                                        <Input value={user.name} name='name' readOnly />
                                    </div>
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Email</p>
                                        <Input value={user.email} name='email' readOnly />
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">University</p>
                                        <Input
                                            placeholder="University name"
                                            defaultValue={user.uni_name}
                                            name="uni_name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Department</p>
                                        <Input
                                            placeholder="Department name"
                                            defaultValue={user.dept}
                                            name="dept"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Club Name</p>
                                        <Input
                                            placeholder="Club name"
                                            name="club_name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <p className="text-md pb-2 font-bold text-gray-700">Club Position</p>
                                        <Input
                                            placeholder="Club position name"
                                            name="club_position"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-md pb-2 font-bold text-gray-700">University website</p>
                                    <Input
                                        placeholder="Website Link"
                                        name="uni_weblink"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="text-md pb-2 font-bold text-gray-700">Facebook ID</p>
                                    <Input
                                        defaultValue={user.fb_link}
                                        placeholder="Facebook Link"
                                        name="fb_link"
                                        required
                                    />
                                </div>

                                {/* File Uploads */}
                                <div className="flex flex-col justify-evenly md:flex-row gap-8 mt-6">
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
            )}
        </div>
    );
};

export default ApplySaForm;