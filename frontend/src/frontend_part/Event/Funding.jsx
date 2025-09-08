import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Funding = () => {
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/funding_requests")
      .then((res) => res.json())
      .then((data) => {
        setFundings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading fundings...</p>;

  if (fundings.length === 0)
    return <p className="text-center mt-10 text-3xl text-[#5c34a0] font-medium">No funding requests available right now.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#5c34a0]">
        Funding Requests
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {fundings.map((fund) => (
          <Card
            key={fund.fund_id}
            className="bg-white shadow-lg hover:shadow-2xl transition-shadow rounded-xl overflow-hidden"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-[#5c34a0] mb-2">
                  {fund.event_name}
                </h2>
                <p className="text-gray-500 mb-4">{fund.uni_name}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm">
                    💰 {fund.amount} TK
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-sm">
                    {fund.type}
                  </span>
                </div>
              </div>

              <NavLink to={`/upcoming_event/${fund.event_id}`}>
                <Button className="w-full bg-gradient-to-r from-[#5c34a0] to-blue-500 text-white py-3 font-semibold rounded-lg hover:from-[#8154ce] hover:to-[#3b82f6] transition-all">
                  View Event Details
                </Button>
              </NavLink>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Funding;
