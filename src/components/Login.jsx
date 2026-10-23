import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [formData, setFormData] = useState({
        email: "",  
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { signIn } = useAuth();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
          await signIn(formData.email, formData.password);
        navigate("/dashboard");
        } catch (authError) {
          console.error("Login error:", authError);
          setError(authError.message || "Login failed. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
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
                <h2 id="auth-modal-title">Login</h2>
              </div>

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
                    disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
);
}
export default Login;