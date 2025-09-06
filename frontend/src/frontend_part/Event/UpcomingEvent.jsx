import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";


const UpcomingEvent = () => {
  const loadEvents = useLoaderData();
  const [events, setEvents] = useState(loadEvents);

  const [searchUni, setSearchUni] = useState("");
  const [searchType, setSearchType] = useState("");

  const totalEvents = events.length;
  const activeEvents = events.filter((e) => new Date(e.deadline) >= new Date()).length;
  const totalCategories = [
    ...new Set(
      events
        .map((e) => (e.categories ? e.categories.split(",") : []))
        .flat()
        .map((c) => c.trim())
    ),
  ].length;

  const filteredEvents = events.filter((event) =>
    (event.uni_name ? event.uni_name.toLowerCase() : "").includes(searchUni.toLowerCase()) &&
    (event.location ? event.location.toLowerCase() : "").includes(searchType.toLowerCase())
  );

  return (
    <div className=" mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">All the upcoming events are here !!</h1>
      <p className="text-xl mb-8">🎉 Join the next big event! Don’t miss out on amazing opportunities and networking ✨ Connect, learn, and grow with like-minded people.  </p>

      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="lg:p-8 shadow-sm border rounded-xl">
          <CardContent>
            <h3 className="text-2xl text-gray-500">Total Events</h3>
            <p className="text-2xl lg:text-4xl font-bold my-2">{totalEvents}</p>
            <p className="text-lg text-gray-400 mt-1">Number of events currently listed on the platform.</p>
          </CardContent>
        </Card>
        <Card className="lg:p-8 shadow-sm border rounded-xl">
          <CardContent>
            <h3 className="text-2xl text-gray-500">Funds Needed</h3>
            <p className="text-2xl lg:text-4xl font-bold my-2">$12,500</p>
            <p className="text-lg text-gray-400 mt-1">Total funding required across all events.</p>
          </CardContent>
        </Card>
        <Card className="lg:p-8 shadow-sm border rounded-xl">
          <CardContent>
            <h3 className="text-2xl text-gray-500">Total Event Categories</h3>
            <p className="text-2xl lg:text-4xl font-bold my-2">{totalCategories}</p>
            <p className="text-lg text-gray-400 mt-1">Different categories or types of events available on the platform.</p>
          </CardContent>
        </Card>
        <Card className="lg:p-8 shadow-sm border rounded-xl">
          <CardContent>
            <h3 className="text-2xl text-gray-500">Active Events</h3>
            <p className="text-2xl lg:text-4xl font-bold my-2">{activeEvents}</p>
            <p className="text-lg text-gray-400 mt-1">Events that are currently active and open for participation.</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Filters */}
      <div className="flex  flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by University..."
          value={searchUni}
          onChange={(e) => setSearchUni(e.target.value)}
          className="md:w-1/2 py-[20px] bg-white"
        />
        <Input
          type="text"
          placeholder="Search by Event location (Online, dhaka)..."
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="md:w-1/2 py-[20px] bg-[#e1d9ef]"
        />
      </div>

      {/* Events List */}
      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.event_id} className="shadow-md border px-4  py-8 rounded-xl">
            <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                {new Date(event.deadline) >= new Date() ? (
                  <button className="bg-green-400 p-2 rounded-lg text-white font-bold mb-4">
                    Active Now
                  </button>
                ) : (
                  <button className="bg-red-500 p-2 rounded-lg text-white font-bold mb-4">
                    Closed
                  </button>
                )}
                <h2 className="text-3xl font-semibold">{event.name}</h2>
                <p className="text-xl my-2 text-gray-500">{event.uni_name}</p>
                <p className="text-lg mt-2">
                  📍 {event.location} | 💰 {event.prize_money} | 📅 {new Date(event.deadline).toLocaleDateString("en-GB")}
                </p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {event.categories &&
                    event.categories.split(",").map((req, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 mt-2 bg-gray-300 rounded-full text-sm"
                      >
                        {req}
                      </span>
                    ))}
                </div>

              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <Button variant="outline">View Details</Button>
                <Button className="bg-gradient-to-r from-[#5c34a0] to-blue-500 text-white">
                  Add to wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredEvents.length === 0 && (
          <p className="text-gray-500">No events found matching criteria.</p>
        )}
      </div>
    </div>
  );
};
export default UpcomingEvent;