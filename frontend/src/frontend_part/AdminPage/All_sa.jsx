import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";

const All_sa = () => {
    const [sas, setSAs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access-token");
        fetch("http://127.0.0.1:5000/get_sas", {
            headers: { token },
        })
            .then((res) => res.json())
            .then((data) => {
                setSAs(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const approveSA = async (saId) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/approve_sa/${saId}`, {
                method: "POST",
            });

            const result = await res.json();
            if (res.ok) {
                toast.success(result.message);
                setSAs(prev => prev.map(sa => sa.sa_id === saId ? { ...sa, role: "student_ambassador" } : sa));
            } else {
                toast.error(result.error || "Approval failed!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };


    const deleteSA = async (saId) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/delete_sa/${saId}`, {
                method: "DELETE",
            });
            const result = await res.json();
            toast.error(result.message);
            setSAs((prev) => prev.filter((sa) => sa.sa_id !== saId));
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    if (loading) return <p className="text-center mt-6">Loading SAs...</p>;
    if (sas.length === 0) return <p className="text-center mt-10 text-3xl text-[#5c34a0] font-medium">No Student Ambassadors.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center text-[#5c34a0] mb-12">
                Approve Student Ambassadors
            </h1>

            <div className="grid gap-8 ">
                {sas.map((sa) => (
                    <Card
                        key={sa.sa_id}
                        className="shadow-lg rounded-2xl p-6 bg-gradient-to-r from-[#a76de0] to-[#5c34a0] text-white hover:scale-105 transform transition-transform duration-300"
                    >
                        <CardContent className="flex flex-col justify-between h-full">
                            <div>
                                <h2 className="text-3xl font-bold mb-3">{sa.name}</h2>
                                <p className="text-lg mb-1">🏫 University: {sa.uni_name}</p>
                                <p className="text-lg mb-1">📚 Department: {sa.dept}</p>
                                <p className="text-lg mb-1">🎯 Club: {sa.club_name}</p>
                                <p className="text-lg mb-1">💼 Position: {sa.club_position}</p>
                                <p className="text-lg mb-2 font-bold hover:text-gray-200">
                                    🌐 University Website  <a href={sa.uni_weblink} target="_blank" rel="noreferrer">{sa.uni_weblink}</a>
                                </p>
                                <p className="text-lg font-bold mb-1">📚 Facebook  <a href={sa.fb_link} target="_blank" rel="noreferrer"></a>{sa.fb_link}</p>

                            </div>

                            <div className="flex gap-4 mt-6">
                                <Button
                                    onClick={() => approveSA(sa.sa_id)}
                                    className={`text-lg font-bold px-6 py-3 rounded-xl ${sa.role === "student_ambassador"
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600 text-white"
                                        }`}
                                    disabled={sa.role === "student_ambassador"}
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={() => deleteSA(sa.sa_id)}
                                    className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold px-6 py-3 rounded-xl"
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <ToastContainer />
        </div>

    );
};


export default All_sa;