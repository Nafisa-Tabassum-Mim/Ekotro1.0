import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = () => {
    const [error, setError] = useState("");

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const description = form.description.value;
        const weblink = form.weblink.value;
        const fb_link = form.fb_link.value;
        const deadline = form.deadline.value;
        const prize_money = form.prize_money.value;
        const uni_name = form.uni_name.value;
        const location = form.location.value;

        const newEvent = { name, description, weblink, fb_link, deadline, prize_money, uni_name, location, };

        const token = localStorage.getItem("access-token");

        await fetch("http://127.0.0.1:5000/create_event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body: JSON.stringify(newEvent),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || "Something went wrong");
                    toast.error(data.error || "❌ Failed to create event");
                    return;
                }
                setError("");
                toast.success("🎉 Event created successfully!");
                form.reset();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Something went wrong.");
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#5c34a0] mb-6">Create Event</h1>

            <form onSubmit={handleCreateEvent} className="space-y-4">
                <input type="text" name="name" placeholder="Event Name" required className="w-full p-3 border rounded-lg" />
                <textarea name="description" placeholder="Event Description" required className="w-full p-3 border rounded-lg"></textarea>
                <input type="url" name="weblink" placeholder="Website Link" className="w-full p-3 border rounded-lg" />
                <input type="url" name="fb_link" placeholder="Facebook Link" className="w-full p-3 border rounded-lg" />
                <input type="date" name="deadline" required className="w-full p-3 border rounded-lg" />
                <input type="text" name="prize_money" placeholder="Prize Money" className="w-full p-3 border rounded-lg" />
                <input type="text" name="uni_name" required placeholder="University Name" className="w-full p-3 border rounded-lg" />
                <input type="text" name="location" required placeholder="Location" className="w-full p-3 border rounded-lg" />

                <button type="submit" className="w-full bg-[#5c34a0] hover:bg-[#3d2270] text-white py-3 rounded-lg font-semibold">
                    Create Event
                </button>
            </form>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <ToastContainer position="top-right" autoClose={2500} theme="colored" />
        </div>
    );
};

export default CreateEvent;
