import React, { useEffect, useState } from 'react';
import { FaFastBackward } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const EventWishlist = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch wishlist using token
    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (!token) {
            console.error("No token found");
            setLoading(false);
            return;
        }
        fetch('http://127.0.0.1:5000/myWishlist', {
            headers: { 'token': token }
        })
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Delete event from wishlist
    const deleteEvent = async (eventId) => {
        const token = localStorage.getItem("access-token");
        try {
            const res = await fetch(`http://127.0.0.1:5000/wishlist/${eventId}`, {
                method: 'DELETE',
                headers: { 'token': token }
            });
            const result = await res.json();
            if (result.message === "Event removed from wishlist successfully!") {
                toast.success("Event removed from your wishlist");
            }
            setEvents(prev => prev.filter(event => event.event_id !== eventId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-6">
                <div className="flex items-center gap-4 my-6">
                    <Button
                        className="bg-[#9274c5] hover:bg-[#5c34a0] text-white px-4 py-2 rounded-lg"
                        onClick={() => window.history.back()}
                    >
                        <FaFastBackward className="mr-2" /> Back
                    </Button>
                    <h1 className="text-4xl text-[#5c34a0] font-bold">My event Wishlist</h1>
                </div>
                <p className="text-gray-600">
                    Here’s a list of all the events you’ve added to your wishlist.
                    Keep track of your favorite university events and never miss an update!
                </p>
            </div>

            {loading && <p className="text-center text-gray-500">Loading your wishlist...</p>}

            {!loading && events.length === 0 && (
                <div className="text-center space-y-3 bg-gray-50 p-6 rounded-lg shadow">
                    <p className="text-xl font-medium text-[#5c34a0]">No events in your wishlist yet 🎯</p>
                    <p className="text-gray-600">Looks like you haven’t added any events.</p>
                    <p className="text-gray-500">Start exploring exciting university events and click on “Add to Wishlist” to save them here!</p>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-1">
                {events.map(event => (
                    <div key={event.event_id} className="border rounded-lg p-6 shadow-md bg-white">
                        <h2 className="text-xl font-semibold text-[#5c34a0]">{event.name}</h2>
                        <p className="text-gray-600">{event.uni_name}</p>

                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => deleteEvent(event.event_id)}
                                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"
                            >
                                Delete Event
                            </button>

                            <NavLink to={`/upcoming_event/${event.event_id}`}>
                                <Button className="bg-gradient-to-r from-[#5c34a0] to-blue-500 text-white px-4 py-2 rounded-lg">
                                    View Details
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </div>

    );
};

export default EventWishlist;
