import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyFunding = () => {
    const { event_id } = useParams(); // get event_id from route
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        setLoading(true);

        const type = e.target.type.value;
        const amount = e.target.amount.value;

        const newFunding = { type, amount };

        try {
            const token = localStorage.getItem("access-token");
            const res = await fetch(`http://127.0.0.1:5000/apply_funding/${event_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify(newFunding),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Something went wrong!");
            } else {
                toast.success("Funding applied successfully!");
                form.reset()
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error!");
            form.reset()

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Apply for Funding</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <Input name="type" type="text" required placeholder="Type of funding" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Amount</label>
                    <Input name="amount" type="number" required placeholder="Amount requested" />
                </div>
                <Button
                    type="submit"
                    className="bg-[#8154ce] text-white w-full py-3"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Apply"}
                </Button>
            </form>
            <ToastContainer position="top-right" />
        </div>
    );
};

export default ApplyFunding;
