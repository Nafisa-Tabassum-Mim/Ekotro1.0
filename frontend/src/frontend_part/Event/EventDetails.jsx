import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { FaFastBackward } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

const EventDetails = () => {
    const { event_id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/event/${event_id}`)
            .then((res) => res.json())
            .then((data) => {
                setEvent(data);
                setLoading(false);
            });
    }, [event_id]);



    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner className="w-10 h-10 text-[#5c34a0]" />
                <span className="ml-2 text-gray-600">Loading event...</span>
            </div>
        );
    }



    const addToWishlist = async (eventId) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            const decoded = jwtDecode(token);
            const user_id = decoded.user_id;

            const wishInfo = { user_id, eventId };

            await fetch("http://127.0.0.1:5000/wishlist", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(wishInfo),
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    if (data.message === "Already in wishlist") {
                        toast.error("Already added in your wishlist!");
                    } else {
                        toast.success("🎉 Event added to wishlist!");
                    }
                })
                .catch((err) => console.error(err));
        }
    };



    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Event Title */}
            <div className="flex items-center gap-4 my-6">
                <Button
                    className="bg-[#9274c5] hover:bg-[#5c34a0] text-white px-4 py-2 "
                    onClick={() => window.history.back()}
                >
                    <FaFastBackward />
                </Button>
                <h1 className="text-4xl font-bold">{event.name}</h1>
            </div>

            <p className="text-gray-500 mb-4 text-2xl">{event.uni_name}</p>

            <div className="relative mb-6 w-full h-64 rounded-xl shadow-md overflow-hidden">
                {/* Event Image */}
                <img
                    src={"/images/event.jfif"}
                    alt={event.name}
                    className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {/* Active/Closed Button */}
                    {new Date(event.deadline) >= new Date() ? (
                        <button className="bg-green-400 px-3 py-2 rounded-lg text-white font-bold">
                            Active Now
                        </button>
                    ) : (
                        <button className="bg-red-500 px-3  py-2 rounded-lg text-white font-bold">
                            Closed
                        </button>
                    )}

                    {/* Deadline */}
                    <p className="bg-black/50 text-white px-2 py-2 rounded-md font-semibold">
                        Deadline: {new Date(event.deadline).toLocaleDateString("en-GB")}
                    </p>
                </div>
            </div>
            {/* Main Info */}
            <Card className="mb-6 shadow-md border rounded-xl">
                <CardContent>
                    <p className="text-lg mb-2">{event.description}</p>
                    <p className="text-lg text-gray-600 mb-1">📍 Location: {event.location}</p>
                    <p className="text-lg text-gray-600 mb-1">💰 Prize Money: {event.prize_money}</p>
                    <p className="text-lg text-gray-600 mb-1">
                        📅 Deadline: {new Date(event.deadline).toLocaleDateString("en-GB")}
                    </p>
                </CardContent>
            </Card>

            {/* Links */}
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 mb-6">
                {/* Left side links */}
                <div className="flex gap-4">
                    {event.weblink && (
                        <a
                            href={event.weblink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border hover:bg-[#66d9ef] px-4 py-2 rounded-lg text-center"
                        >
                            Event Website
                        </a>
                    )}
                    {event.fb_link && (
                        <a
                            href={event.fb_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg text-center bg-gradient-to-r from-[#5c34a0] to-blue-500 text-white"
                        >
                            Facebook Event
                        </a>
                    )}
                </div>

                {/* Right side button */}
                <Button
                    className="p-[22px] bg-gradient-to-r from-[#9c88c0] to-blue-800 text-white"
                    onClick={() => addToWishlist(event.event_id)}>
                    Add to Wishlist
                </Button>
            </div>
            <ToastContainer />

        </div>
    );
};

export default EventDetails;
