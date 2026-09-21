function DoctorCard({ doctor }) {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="team-thumb wow fadeInUp" data-wow-delay={doctor.delay}>
        <img
          src={doctor.image}
          className="img-responsive"
          alt=""
        />

        <div className="team-info">
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>

          <div className="team-contact-info">
            <p>
              <i className="fa fa-phone"></i> {doctor.phone}
            </p>

            <p>
              <i className="fa fa-envelope-o"></i>{" "}
              <a href="#">{doctor.email}</a>
            </p>
          </div>

           <ul className="social-icon">
            {(doctor.socials || []).map((social, index) => (
              <li key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`fa ${social.icon}`}
                ></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;