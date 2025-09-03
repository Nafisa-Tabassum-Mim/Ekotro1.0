
const topSponsors = [
  {
    name: "COMPUTER MANIA BD",
    logo: "/images/mania.jfif",
    role: "Presented By",
  },
  {
    name: "bdapps",
    logo: "/images/bdapp.jfif",
    role: "Powered By",
  },
];

const otherSponsors = [
  {
    name: "Data Solution 360",
    logo: "/images/360.jfif",
    role: "Supported By",
  },
  {
    name: "Zaylen Digital",
    logo: "/images/zaylen.jfif",
    role: "Tech Partner",
  },
  {
    name: "Daily Sun",
    logo: "/images/dailysun.jfif",
    role: "Print Media Partner",
  },
  {
    name: "Radio Today",
    logo: "/images/radiotoday.jfif",
    role: "Radio Partner",
  },
  {
    name: "Club Partner",
    logo: "/images/buaps.jfif",
    role: "Club Partner",
  },
];
const Section2 = () => {
  return (
    <section className="py-12 my-12  lg:mx-22">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-semibold text-purple-800 font-poppins">
          Our Sponsors and Partners
        </h2>
      </div>

      {/* Top row (Presented + Powered) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mx-auto mb-8 px-6">
        {topSponsors.map((sponsor, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border rounded-lg shadow-sm p-8 bg-white hover:shadow-md transition"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-22  mb-4"
            />
            <p className="text-gray-700 text-lg font-medium font-poppins">
              {sponsor.role}
            </p>
          </div>
        ))}
      </div>

      {/* Other sponsors (smaller cards below) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6  mx-auto px-6">
        {otherSponsors.map((sponsor, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-32 object-contain mb-4"
            />
            <p className="text-gray-700 text-lg font-medium font-poppins">
              {sponsor.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default Section2;