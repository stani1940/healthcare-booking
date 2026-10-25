import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../bootstrap";
import Header from "./header/Header";
import About from "./About";
import Team from "./Team";
import News from "./News";
import Appointment from "./Appointment";
import GoogleMap from "./GoogleMap";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import "./RegisterModal.css";

function Home({ showRegister = false, showLogin = false }) {
  const navigate = useNavigate();
  const showAuthModal = showRegister || showLogin;

  useEffect(() => {
    if (!showAuthModal) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        navigate("/");
      }
    }

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, showAuthModal]);

  function closeAuthModal() {
    navigate("/");
  }

  return (
    <>
      <Header />
      <About />
      <Team />
      <News />
      <Appointment />
      <GoogleMap />
      <Footer />
      {showAuthModal && (
        <>
          <div
            className="modal-backdrop fade in"
            onClick={closeAuthModal}
            aria-hidden="true"
          />
          <div
            className="modal fade in auth-modal"
            role="dialog"
            aria-labelledby="auth-modal-title"
            aria-modal="true"
            tabIndex="-1"
            style={{ display: "block" }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeAuthModal();
              }
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={closeAuthModal}
                    aria-label={`Close ${showRegister ? "registration" : "login"}`}
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  {showRegister ? <Register /> : <Login />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;