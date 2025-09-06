
const events = {
  registration: [
    {
      day: "Day 1",
      date: "October 24, 2024",
      title: "Registration Opens",
      desc: "Registration for IntraHacktive 1.0 begins. Participants can register online through the website."
    },
    {
      day: "Day 2",
      date: "October 28, 2024",
      title: "Debuggers and Database Wizard Deadline",
      desc: "Registration deadline for Debuggers and Database Wizard challenges. Ensure your registration is completed by this date."
    },
    {
      day: "Day 3",
      date: "October 31, 2024",
      title: "Hackathon Deadline",
      desc: "Registration along with the submission deadline for the high-level solution and video presentation for the Hackathon. Teams will be shortlisted based on this submission."
    }
  ],
  mainEvents: [
    {
      day: "Day 3",
      date: "November 3, 2024",
      title: "Online Round for Debuggers & Database Wizard",
      desc: "Compete in the online preliminary round for Debuggers and Database Wizard. Participants will be tested on their debugging skills or database management expertise."
    },
    {
      day: "Day 4",
      date: "November 8, 2024",
      title: "Online Hackathon Begins",
      desc: "The online Hackathon starts. Teams will receive a contained version of their preliminary problem statement and must create a product within 72 hours."
    },
    {
      day: "Day 5",
      date: "November 10, 2024",
      title: "Online Hackathon Ends",
      desc: "The 72-hour online Hackathon comes to an end. Submissions must be made before the deadline."
    },
    {
      day: "Day 6",
      date: "November 11, 2024",
      title: "Final Round and Presentations",
      desc: "On-campus final round for Hackathon, Debuggers, and Database Wizard. Teams will polish their products for Hackathon and present to judges. Debuggers and Database Wizards will compete offline."
    }
  ]
};

const Section1 = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-purple-700">
        Event Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Registration */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-purple-700">
            Registration
          </h3>
          <ul className="space-y-8">
            {events.registration.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-purple-700 text-white rounded-full px-4 py-2 font-semibold">
                    {item.day}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">{item.date}</p>
                  <h4 className="font-bold text-lg mt-1">{item.title}</h4>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Events */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-purple-700">
            Events
          </h3>
          <ul className="space-y-8">
            {events.mainEvents.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-pink-700 text-white rounded-full px-4 py-2 font-semibold">
                    {item.day}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">{item.date}</p>
                  <h4 className="font-bold text-lg mt-1">{item.title}</h4>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Section1;