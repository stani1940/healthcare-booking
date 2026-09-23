function NavBar({onAddDoctor}) {
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
              <a href="#top" className="smoothScroll">
                Home
              </a>
            </li>

            <li>
              <a href="#about" className="smoothScroll">
                About Us
              </a>
            </li>

            <li>
              <a href="#team" className="smoothScroll">
                Doctors
              </a>
            </li>

            <li>
              <a href="#news" className="smoothScroll">
                News
              </a>
            </li>

            <li>
              <a href="#google-map" className="smoothScroll">
                Contact
              </a>
            </li>

            <li className="appointment-btn">
              <a href="#appointment">
                Make an appointment
              </a>
            </li>
            <li className="appointment-btn">
              <button
                type="button"
                onClick={onAddDoctor}
                className="section-btn btn btn-default"
              >
              Add Doctor
              </button>
            </li>
          </ul>
        </div>

      </div>
    </section>
);

}
        
export default NavBar