function topBar() {
    return(
        <header>
            <div className="container">
                <div className="row">

                <div className="col-md-4 col-sm-5">
                    <p>Welcome to a Professional Health Care</p>
                </div>

          <div className="col-md-8 col-sm-7 text-align-right">
            <span className="phone-icon">
              <i className="fa fa-phone"></i> 010-060-0160
            </span>

            <span className="date-icon">
              <i className="fa fa-calendar-plus-o"></i>{" "}
              6:00 AM - 10:00 PM (Mon-Fri)
            </span>

            <span className="email-icon">
              <i className="fa fa-envelope-o"></i>{" "}
              <a href="#">info@company.com</a>
            </span>
          </div>

        </div>
      </div>
    </header>
    );
}

export default topBar