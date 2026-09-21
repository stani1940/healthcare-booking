import DoctorCard from "./DoctorCard";
import { useEffect} from "react";
import { supabase } from "../lib/supabase";
function team() {
  useEffect(() => {
    supabase
      .from("doctors")
      .select("*")
      .then   ((result) => {
        console.log(result.data);
        
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

         {/* {doctors.map((doctor) => (
            <DoctorCard 
            key={doctor.name} 
            doctor={doctor} 
            />
          ))} */}

        </div>
      </div>
    </section>
  );
             

}
export default team;
