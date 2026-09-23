import { useState } from "react";

function AddDoctor({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
    image: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  
  return (
    <div className="doctor-modal">
      <div className="doctor-modal-content">
        <button
          type="button"
          className="doctor-modal-close"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="about-info">
          <h2>Add Doctor</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              className="form-control"
              value={formData.specialty}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="image"
              name="image"
              className="form-control"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="section-btn btn btn-default"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;