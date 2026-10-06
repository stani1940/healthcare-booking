import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const isLoggedIn = localStorage.getItem("access_token");
  const navigate = useNavigate();
  function handleLogout() {
  localStorage.removeItem("access_token");
  navigate("/");
  }
  return (
         <section
            className="navbar navbar-default navbar-static-top"
            role="navigation"
            >
            <div className="container">

            <div className="navbar-header">
            <button
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
            >
            <span className="icon icon-bar"></span>
            <span className="icon icon-bar"></span>
            <span className="icon icon-bar"></span>
          </button>

          {/* lOGO TEXT HERE */}
          <a href="index.html" className="navbar-brand">
            <i className="fa fa-h-square"></i>ealth Center
          </a>
        </div>

        {/* MENU LINKS */}
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
               <NavLink to="/#top" className="smoothScroll">
               Home
               </NavLink>
            </li>

            <li>
              <a href= "/#about" className="smoothScroll">
                About Us
              </a>
            </li>

            <li>
              <a href="/#team" className="smoothScroll">
                Doctors
              </a>
            </li>

            <li>
              <a href="/#news" className="smoothScroll">
                News
              </a>
            </li>

            <li>
              <a href="/#google-map">
                Contact
              </a>
            </li>

            <li className="appointment-btn">
              <NavLink to="/appointment">
                Make an appointment
              </NavLink>
            </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/login">
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/my-appointments">
                    My Appointments
                </NavLink>
              </li>

            <li>
              <button 
              type="button"
              className="btn btn-success"
               onClick={handleLogout}
               >
                Logout
              </button>
            </li>
            </>
          )}

            <li className="appointment-btn">
               <NavLink to="/add-doctor">
                Add Doctor
              </NavLink>
            </li>
           
          </ul>
        </div>

      </div>
    </section>
);

}
        
export default NavBar