import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function login() {
    const [formData, setFormData] = useState({
        email: "",  
        password: "",
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
        fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.error_description ||
            error.msg ||
            error.message ||
            "Login failed"
          );
        });
      }

      return response.json();
    })
    .then((data) => {
      console.log("Logged in user:", data);
        localStorage.setItem("access_token", data.access_token);
        navigate("/dashboard");
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
    }

  return (
     <section id="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form
              id="login-form"
              role="form"
              onSubmit={handleSubmit}
            >
              <div className="section-title">
                <h2>Login</h2>
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

              <button
                type="submit"
                className="form-control"
                id="cf-submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
);
}
 export default login