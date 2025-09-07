
const events = {
  registration: [
    {
      day: "Day 1",
      title: "Registration Opens",
      desc: "Click on Sign Up / Register. Choose your role: Student or Company. Fill in your details (name, email, password, university/company, etc.).Confirm your email if required. or student."
    },
    {
      day: "Day 2",
      title: "Complete Your Profile",
      desc: "Log in to your account.Upload a profile photo.Add social links (optional, e.g., LinkedIn, Facebook).For students: add your university, department, and year.For companies: add your organization name and type of events you host."
    },
    {
      day: "Day 3",
      title: "Explore Events",
      desc: "Navigate to the Events section.Browse events by university, category, or date. Click on an event to see full details: Description Date & Time Location (online or offline) Participation requirements"
    }
  ],
  mainEvents: [
    {
      day: "Day 3",
      title: "Register for an Event",
      desc: "Select the event you want to join.Click Register / Join. Fill in any required information (e.g., team members, project details). Confirm your registration. For companies hosting events: you can create an event by providing all details and setting deadlines."
    },
    {
      day: "Day 4",
      title: "Participate in Events",
      desc: "For online events: Log in on the event date. Access resources, challenges, or competition tasks. Submit your work via Ekotro 1.0. For offline events: Check the event location and schedule. Attend on time and use Ekotro 1.0 to track your results or submissions."
    },
    {
      day: "Day 5",
      title: "Track Your Progress",
      desc: "Visit your Dashboard to see. Events you joined Deadlines and reminders Submissions and results For companies: monitor participant registrations, submissions, and feedback."
    },
    {
      day: "Day 6",
      title: "Get Notifications & Updates",
      desc: "Enable notifications to receive. New events at your university Reminders for deadlines Announcements from companies or event organizers"
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