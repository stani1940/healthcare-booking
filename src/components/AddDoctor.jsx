import { useState} from "react";
import { useNavigate } from "react-router-dom";

function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    image: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/doctors`, {
    method: "POST",
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Failed to add doctor");
        });
      }

      return response.json();
    })
    .then((data) => {
      console.log("Doctor added:", data);

      setFormData({
        name: "",
        specialty: "",
        phone: "",
        email: "",
        image: "",
      });
    })
    .catch((error) => {
      console.error("Error adding doctor:", error);
    });
  }

  
  return (
     <section id="add-doctor">
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
              onSubmit={handleSubmit}
            >

              <div className="section-title">
                <h2>Add Doctor</h2>
                <button
                      type="button"
                      className="doctor-modal-close"
                      onClick={() => navigate("/")}
              >
                      &times;
              </button>

              </div>
              

              <div>
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
                  <label htmlFor="specialty">Specialty</label>
                  <input
                    type="text"
                    className="form-control"
                    id="specialty"
                    name="specialty"
                    placeholder="Specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12 col-sm-12">
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    placeholder="Image path"
                    value={formData.image}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="form-control"
                    id="cf-submit"
                    name="submit"
                  >
                    Add Doctor
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

export default AddDoctor;