import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
function UserAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            navigate("/login");
            return;
        }

        fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/appointments?select=id,appointment_date,appointment_time,status,notes,doctors(name,specialty)&order=appointment_date.asc,appointment_time.asc`,
            {
                method: "GET",
                headers: {
                apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                Authorization: `Bearer ${accessToken}`,
            }
        }
    )
    .then (async (response) => {
        const body = await response.text();

        if (!response.ok) {
            throw new Error(body || "Could not fetch appointments");
        }

        return body ? JSON.parse(body) : [];
    })
    .then((data) => {
        setAppointments(data);
    })
    .catch((error) => {
        console.error("Error fetching appointments:", error);
        setError("Could not fetch appointments.");
    })
    .finally(() => {
        setLoading(false);
    });
}, [navigate]);

return (
    <section className="user-appointments">
    <div className="user-appointments">
        <div className="container">
            <h2>Your Appointments</h2>
            <p> Your appointments will be displayed here.</p>

        </div>
        
        {loading && <p>Loading appointments...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && appointments.length === 0 && (
          <p>You don't have any appointments yet.</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="row">
            {appointments.map((appointment) => (
              <div
                className="col-md-6 col-sm-6"
                key={appointment.id}
              >
                <div className="appointment-card">
                  <h3>
                    {appointment.doctors?.name || "Doctor"}
                  </h3>

                  <p>
                    {appointment.doctors?.specialty || ""}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {appointment.appointment_date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {appointment.appointment_time}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {appointment.status}
                  </p>

                  {appointment.notes && (
                    <p>
                      <strong>Notes:</strong>{" "}
                      {appointment.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default UserAppointments;

        

