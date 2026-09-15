function About() {
    return (
        <section id="about">
      <div className="container">
        <div className="row">

          <div className="col-md-6 col-sm-6">
            <div className="about-info">
              <h2 className="wow fadeInUp" data-wow-delay="0.6s">
                Welcome to Your <i className="fa fa-h-square"></i>ealth Center
              </h2>

              <div className="wow fadeInUp" data-wow-delay="0.8s">
                <p>
                  Aenean luctus lobortis tellus, vel ornare enim molestie
                  condimentum. Curabitur lacinia nisi vitae velit volutpat
                  venenatis.
                </p>

                <p>
                  Sed a dignissim lacus. Quisque fermentum est non orci
                  commodo, a luctus urna mattis. Ut placerat, diam a tempus
                  vehicula.
                </p>
              </div>

              <figure className="profile wow fadeInUp" data-wow-delay="1s">
                <img
                  src="/images/author-image.jpg"
                  className="img-responsive"
                  alt=""
                />

                <figcaption>
                  <h3>Dr. Neil Jackson</h3>
                  <p>General Principal</p>
                </figcaption>
              </figure>
            </div>
          </div>

        </div>
      </div>
    </section>
    );
}

export default About;