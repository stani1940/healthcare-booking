import {useState, useEffect} from "react";
function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    doctorId: "",
    telephone: "",
    message: ""
  });

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/doctors?select=id,name,specialty&order=name.asc`, {
      headers: {
        method: "GET",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load doctors");
        }
         
        return response.json()
      })

    .then((data) => {
        setDoctors(data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Failed to load doctors. Please try again later.");
      })
      .finally(() => {
        setLoadingDoctors(false);
      });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("You must be logged in to make an appointment.");
      return;
    }

    setLoadingSubmit(true);
    
    
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/user`, {
      method: "GET",
      headers: {
        "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        "Authorization": `Bearer ${accessToken}`,
      },
      })
  
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not get current user");
        }

        return response.json();
      })
      .then((user) => {
        const appointmentData = {
          user_id: user.id,
          doctor_id: formData.doctorId,
          appointment_date: formData.date,
          appointment_time: formData.time,
          status: "pendng",
          notes: formData.message,   
        };

         return fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/appointments`,
          {
            method: "POST",
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json" ,
              Prefer: "return=minimal",
            },
            body: JSON.stringify(appointmentData)
          }
         );
      })

      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(
              error.message || "Could not create appointment"
            );
          });
        }

        //return response.json();
      })
      
      .then((data) => {

        setSuccess("Appointment created successfully.");

        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          doctorId: "",
          telephone: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Appointment error:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  }

  return (
    <section id="appointment" data-stellar-background-ratio="3">
      <div className="container">
        <div className="row">

          <div className="col-md-6 col-sm-6">
            <img
              src="/images/appointment-image.jpg"
              className="img-responsive"
              alt=""
            />
          </div>

          <div className="col-md-6 col-sm-6">
            <form 
                id="appointment-form" 
                role="form"
                onSubmit={handleSubmit}>
              <div className="section-title wow fadeInUp" data-wow-delay="0.4s">
                <h2>Make an appointment</h2>
              </div>

              <div className="wow fadeInUp" data-wow-delay="0.8s">
                <div className="col-md-6 col-sm-6">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="date">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="time">Select Time</label>
                  <input
                    id="time"
                    className="form-control"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}      
                  />              
                </div>

                <div className="col-md-12 col-sm-12">
                  <label htmlFor="doctorId">Select Doctor</label>

                  <select
                    className="form-control"
                    name="doctorId"
                    id="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    disabled={loadingDoctors}
                  >
                    <option value="">
                      {loadingDoctors
                        ? "Loading doctors..."
                        : "Select Doctor"}
                    </option>

                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="telephone">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telephone"
                    name="telephone"
                    placeholder="Phone"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="message">Additional Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    id="message"
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-md-12 col-sm-12">
                  {error && (
                    <p className="appointment-error">
                      {error}
                    </p>
                  )}

                  {success && (
                    <p className="appointment-success">
                      {success}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="form-control"
                    id="cf-submit"
                    disabled={loadingSubmit}
                  >
                    {loadingSubmit
                    ? "Submitting..."
                    : "Make an Appointment"}
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>

    );
}
export default Appointment;