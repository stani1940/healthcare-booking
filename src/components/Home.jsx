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
import "./RegisterModal.css";

function Home({ showRegister = false }) {
  const navigate = useNavigate();
  const registerModalRef = useRef(null);

  useEffect(() => {
    if (!registerModalRef.current) {
      return undefined;
    }

    const $modal = $(registerModalRef.current);
    function handleModalHidden() {
      if (showRegister) {
        navigate("/");
      }
    }

    $modal.on("hidden.bs.modal", handleModalHidden);
    $modal.modal({ show: showRegister, backdrop: true, keyboard: true });

    return () => {
      $modal.off("hidden.bs.modal", handleModalHidden);
      $modal.modal("hide");
    };
  }, [navigate, showRegister]);

  return (
    <>
      <Header />
      <About />
      <Team />
      <News />
      <Appointment />
      <GoogleMap />
      <Footer />
      {showRegister && (
        <>
          <div
            ref={registerModalRef}
            className="modal fade register-modal"
            role="dialog"
            aria-labelledby="register-modal-title"
            tabIndex="-1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close registration"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Register />
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