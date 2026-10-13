import { useEffect, useRef } from "react";
import $ from "jquery";
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
  const authModalRef = useRef(null);
  const showAuthModal = showRegister || showLogin;

  useEffect(() => {
    if (!authModalRef.current) {
      return undefined;
    }

    const $modal = $(authModalRef.current);
    function handleModalHidden() {
      if (showAuthModal) {
        navigate("/");
      }
    }

    $modal.on("hidden.bs.modal", handleModalHidden);
    $modal.modal({ show: showAuthModal, backdrop: true, keyboard: true });

    return () => {
      $modal.off("hidden.bs.modal", handleModalHidden);
      $modal.modal("hide");
    };
  }, [navigate, showAuthModal]);

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
            ref={authModalRef}
            className="modal fade auth-modal"
            role="dialog"
            aria-labelledby="auth-modal-title"
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
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