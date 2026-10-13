import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
function UserAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
      doctorId: "",
      date: "",
      time: "",
      notes: "",
    });

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            navigate("/login");
            return;
        }

       
     Promise.all([
      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/appointments?select=id,appointment_date,appointment_time,status,notes,doctor_id,doctors(name,specialty)&order=appointment_date.asc,appointment_time.asc`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),

      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/doctors?select=id,name,specialty&order=name.asc`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    ])
      .then(async ([appointmentsResponse, doctorsResponse]) => {
        if (!appointmentsResponse.ok) {
          throw new Error("Could not load appointments.");
        }

        if (!doctorsResponse.ok) {
          throw new Error("Could not load doctors.");
        }

        const appointmentsData = await appointmentsResponse.json();
        const doctorsData = await doctorsResponse.json();

        setAppointments(appointmentsData);
        setDoctors(doctorsData);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


function handleDelete(appointmentId) {
  const confimed = window.confirm(
    "Are you sure you want to delete this appointment?"
  );
  
  if (!confimed) {
    return;
  }
  
  setError("");
  setSuccess("");

  const accessToken = localStorage.getItem("access_token");

  fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/appointments?id=eq.${appointmentId}`,
    {
      method: "DELETE",
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then ((response) => {
      const body =  response.text();
      if (!response.ok) {
        throw new Error(body || "Could not delete appointment");
      }
      return body;
    })
    .then(() => {
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );
      setSuccess("Appointment deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting appointment:", error);
      setError("Could not delete appointment.");
    });
}

function handleEdit(appointment) {
 setSuccess("");
 setError("");
 setEditingId(appointment.id);
 setEditData({
   doctorId: String(appointment.doctor_id ?? appointment.doctors?.id ?? ""),
   date: appointment.appointment_date,
    time: appointment.appointment_time 
    ? appointment.appointment_time.slice(0, 5)
    : "",
    notes: appointment.notes || "",
  });
}

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditData({
      doctorId: "",
      date: "",
      time: "",
      notes: "",
    });
  }

  function handleEditSubmit(e) {
    setEditingId(null);
    setEditData({
      doctorId: "",
      date: "",
      time: "",
      notes: "",
    });
  }

  function handleUpdate(appointmentId) {
    setError("");
    setSuccess("");

    if (!editData.doctorId) {

      setError("Please select a doctor.");
      return;
    }

    if (!editData.date) {
      setError("Please select a date.");
      return;
    }

    if (!editData.time) {
      setError("Please select a time.");
      return;
    }

    const accessToken = localStorage.getItem("access_token");

    const updatedAppointment = {
      doctor_id: editData.doctorId,
      appointment_date: editData.date,
      appointment_time: editData.time,
      notes: editData.notes,
    };

    fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/appointments?id=eq.${appointmentId}`,
      {
        method: "PATCH",
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(updatedAppointment),
      }
    )
      .then(async (response) => {
       const body = await response.text();
        if (!response.ok) {
          throw new Error(body || "Could not update appointment");
        }

       return body ? JSON.parse(body) : [];
      })
      .then((updatedData) => {
       const updatedAppointment = updatedData[0] ?? {
         id: appointmentId,
         doctor_id: editData.doctorId,
         appointment_date: editData.date,
         appointment_time: editData.time,
         notes: editData.notes,
       };
       const selectedDoctor = doctors.find(
         (doctor) => String(doctor.id) === String(updatedAppointment.doctor_id)
       );

       setAppointments((prevAppointments) =>
         prevAppointments.map((appointment) =>
           appointment.id === appointmentId
       ? {
             ...appointment,
             ...updatedAppointment,
             doctors: selectedDoctor || appointment.doctors,
           }
       : appointment
          )
        );

          setEditingId(null);
       
          setSuccess("Appointment updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
        setError(error.message || "Could not update appointment.");
      });
    }
  

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

                    {editingId === appointment.id ? (
                  <>
                      <h3>Edit Appointment</h3>

                      <div className="form-group">
                        <label htmlFor={`doctor-${appointment.id}`}>
                          Doctor
                        </label>

                        <select
                              id={`doctor-${appointment.id}`}
                              name="doctorId"
                              className="form-control"
                              value={editData.doctorId}
                              onChange={handleEditChange}
                        >
                          <option value="">Select Doctor</option>

                            {doctors.map((doctor) => (
                              <option key={doctor.id} value={doctor.id}>
                                {doctor.name} - {doctor.specialty}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor={`date-${appointment.id}`}>
                          Date
                        </label>

                        <input
                          type="date"
                          id={`date-${appointment.id}`}
                          name="date"
                          className="form-control"
                          value={editData.date}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor={`time-${appointment.id}`}>
                          Time
                        </label>

                        <input
                          type="time"
                          id={`time-${appointment.id}`}
                          name="time"
                          className="form-control"
                          value={editData.time}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor={`notes-${appointment.id}`}>
                          Notes
                        </label>

                        <textarea
                          id={`notes-${appointment.id}`}
                          name="notes"
                          className="form-control"
                          rows="4"
                          value={editData.notes}
                          onChange={handleEditChange}
                        />
                      </div>

                      <button
                        type="button"
                        className="section-btn btn btn-default"
                        onClick={() =>
                          handleUpdate(appointment.id)
                        }
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
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

                    <div className="appointment-actions">
                        <button
                          type="button"
                          className="section-btn btn btn-default"
                          onClick={() =>
                            handleEdit(appointment)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="section-btn btn btn-default"
                          onClick={() =>
                            handleDelete(appointment.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                      </>
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

export default UserAppointments
