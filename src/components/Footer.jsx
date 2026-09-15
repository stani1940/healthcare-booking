function Footer() {
  return (
     <footer data-stellar-background-ratio="5">
      <div className="container">
        <div className="row">

          <div className="col-md-4 col-sm-4">
            <div className="footer-thumb">
              <h4 className="wow fadeInUp" data-wow-delay="0.4s">
                Contact Info
              </h4>

              <p>
                Fusce at libero iaculis, venenatis augue quis, pharetra lorem.
              </p>

              <div className="contact-info">
                <p>
                  <i className="fa fa-phone"></i> 010-070-0170
                </p>
                <p>
                  <i className="fa fa-envelope-o"></i>{" "}
                  <a href="#">info@company.com</a>
                </p>
                <p>
                  <i className="fa fa-map-marker"></i> 123 Street, San
                  Francisco, CA 94102
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="footer-thumb">
              <h4 className="wow fadeInUp" data-wow-delay="0.4s">
                Latest News
              </h4>

              <div className="latest-stories">
                <div className="stories-image">
                  <a href="#">
                    <img
                      src="/images/news-image1.jpg"
                      className="img-responsive"
                      alt=""
                    />
                  </a>
                </div>

                <div className="stories-info">
                  <a href="#">
                    <h5>Amazing Technology</h5>
                  </a>
                  <span>March 08, 2018</span>
                </div>
              </div>

              <div className="latest-stories">
                <div className="stories-image">
                  <a href="#">
                    <img
                      src="/images/news-image2.jpg"
                      className="img-responsive"
                      alt=""
                    />
                  </a>
                </div>

                <div className="stories-info">
                  <a href="#">
                    <h5>New Healing Process</h5>
                  </a>
                  <span>February 20, 2018</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="footer-thumb">
              <h4 className="wow fadeInUp" data-wow-delay="0.4s">
                Opening Hours
              </h4>

              <div className="opening-hours">
                <p>
                  Monday - Friday <span>06:00 AM - 10:00 PM</span>
                </p>
                <p>
                  Saturday <span>09:00 AM - 08:00 PM</span>
                </p>
                <p>
                  Sunday <span>Closed</span>
                </p>
              </div>

              <ul className="social-icon">
                <li>
                  <a href="#" className="fa fa-facebook-square"></a>
                </li>
                <li>
                  <a href="#" className="fa fa-twitter"></a>
                </li>
                <li>
                  <a href="#" className="fa fa-instagram"></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-12 col-sm-12">
            <div className="footer-bottom">
              <div className="col-md-6 col-sm-6">
                <div className="copyright-text">
                  <p>Copyright &copy; 2018 Your Company</p>
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="footer-link">
                  <p>
                    Design:{" "}
                    <a
                      href="https://www.tooplate.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tooplate
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
         

    );
}
export default Footer;
