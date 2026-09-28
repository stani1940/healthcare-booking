import React, { useState } from "react";
function register() {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const registerData = {
            email: formData.email,
            password: formData.password,
            data: {
            username: formData.username,
            name: formData.name,
           }
        };

        fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, {
            method: "POST",
            headers: {
                "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                    throw new Error(error.msg || error.message || "Registration failed");
                });
      }

      return response.json();
    })  
            .then((data) => {
                console.log("Registration successful:", data);
                // Handle successful registration (e.g., redirect to login)
            })
            .catch((error) => {
                console.error("Registration error:", error);
                
            });
    }

      return (
    <section id="register">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form
              id="register-form"
              role="form"
              onSubmit={handleSubmit}
            >
              <div className="section-title">
                <h2>Register</h2>
              </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        />

                </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.name}
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
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Your Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="form-control"
                id="cf-submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
 export default register;