import DoctorCard from "./DoctorCard";
function team() {
   const doctors = [
    {
      name: "Nate Baston",
      specialty: "General Principal",
      phone: "010-020-0120",
      email: "general@company.com",
      image: "/images/team-image1.jpg",
      delay: "0.2s",
      socials: [
        { icon: "fa-linkedin-square" },
        { icon: "fa-envelope-o" },
      ],
    },
    {
      name: "Jason Stewart",
      specialty: "Pregnancy",
      phone: "010-070-0170",
      email: "pregnancy@company.com",
      image: "/images/team-image2.jpg",
      delay: "0.4s",
      socials: [
        { icon: "fa-facebook-square" },
        { icon: "fa-envelope-o" },
        { icon: "fa-flickr" },
      ],
    },
    {
      name: "Miasha Nakahara",
      specialty: "Cardiology",
      phone: "010-040-0140",
      email: "cardio@company.com",
      image: "/images/team-image3.jpg",
      delay: "0.6s",
      socials: [
        { icon: "fa-twitter" },
        { icon: "fa-envelope-o" },
      ],
    },
  ];

    return (
         <section id="team" data-stellar-background-ratio="1">
      <div className="container">
        <div className="row">

          <div className="col-md-6 col-sm-6">
            <div className="about-info">
              <h2 className="wow fadeInUp" data-wow-delay="0.1s">
                Our Doctors
              </h2>
            </div>
          </div>

          <div className="clearfix"></div>

         {doctors.map((doctor) => (
            <DoctorCard 
            key={doctor.name} 
            doctor={doctor} 
            />
          ))}

        </div>
      </div>
    </section>
  );
             

}
export default team;
