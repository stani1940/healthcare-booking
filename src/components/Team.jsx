import DoctorCard from "./DoctorCard";
import { useEffect , useState} from "react";
function Team() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/doctors?select=*`;
    fetch(url, {
      headers: {
        "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);



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
          {loading && <p>Loading doctors...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && doctors.map((doctor) => (
            <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            />
          ))} 

        </div>
      </div>
    </section>
  );
             

}
export default Team;
