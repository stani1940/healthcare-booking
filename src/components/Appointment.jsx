import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Appointment() {
  const navigate = useNavigate();

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

  function handleDateChange(date) {
    const formattedDate = date
      ? [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-")
      : "";

    setFormData((previousData) => ({
      ...previousData,
      date: formattedDate
    }));
  }

  function handleTimeChange(date) {
    const formattedTime = date
      ? `${String(date.getHours()).padStart(2, "0")}:${String(
          date.getMinutes()
        ).padStart(2, "0")}`
      : "";

    setFormData((previousData) => ({
      ...previousData,
      time: formattedTime
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("You must be logged in to make an appointment.");
      setLoadingSubmit(false);
      navigate("/login");
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
      
      .then(() => {

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
        navigate("/my-appointments");
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
                autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="date">Select Date</label>
                  <DatePicker
                    className="form-control"
                    id="date"
                    autoComplete="off"
                    dateFormat="yyyy-MM-dd"
                    selected={
                      formData.date
                        ? new Date(`${formData.date}T00:00:00`)
                        : null
                    }
                    onChange={handleDateChange}
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="time">Select Time</label>
                  <DatePicker
                    id="time"
                    className="form-control"
                    autoComplete="off"
                    selected={
                      formData.time
                        ? new Date(`2000-01-01T${formData.time}:00`)
                        : null
                    }
                    onChange={handleTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                  />
                </div>

                <div className="col-md-12 col-sm-12">
                  <label htmlFor="doctorId">Select Doctor</label>

                  <select
                    className="form-control"
                    name="doctorId"
                    id="doctorId"
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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