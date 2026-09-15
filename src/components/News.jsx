function News() {
    return (
        <section id="news" data-stellar-background-ratio="2.5">
      <div className="container">
        <div className="row">

          <div className="col-md-12 col-sm-12">
            <div className="section-title wow fadeInUp" data-wow-delay="0.1s">
              <h2>Latest News</h2>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="news-thumb wow fadeInUp" data-wow-delay="0.2s">
              <a href="news-detail.html">
                <img
                  src="/images/news-image1.jpg"
                  className="img-responsive"
                  alt=""
                />
              </a>

              <div className="news-info">
                <span>March 08, 2018</span>
                <h3>
                  <a href="news-detail.html">
                    About Amazing Technology
                  </a>
                </h3>
                <p>
                  Maecenas risus neque, placerat volutpat tempor ut, vehicula
                  eget felis.
                </p>

                <div className="author">
                  <img
                    src="/images/author-image.jpg"
                    className="img-responsive"
                    alt=""
                  />
                  <div className="author-info">
                    <h5>Jason Stewart</h5>
                    <p>General Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="news-thumb wow fadeInUp" data-wow-delay="0.4s">
              <a href="news-detail.html">
                <img
                  src="/images/news-image2.jpg"
                  className="img-responsive"
                  alt=""
                />
              </a>

              <div className="news-info">
                <span>February 20, 2018</span>
                <h3>
                  <a href="news-detail.html">
                    Introducing a new healing process
                  </a>
                </h3>
                <p>
                  Fusce vel sem finibus, molestie massa eu, pulvinar urna.
                </p>

                <div className="author">
                  <img
                    src="/images/author-image.jpg"
                    className="img-responsive"
                    alt=""
                  />
                  <div className="author-info">
                    <h5>Jason Stewart</h5>
                    <p>General Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="news-thumb wow fadeInUp" data-wow-delay="0.6s">
              <a href="news-detail.html">
                <img
                  src="/images/news-image3.jpg"
                  className="img-responsive"
                  alt=""
                />
              </a>

              <div className="news-info">
                <span>January 27, 2018</span>
                <h3>
                  <a href="news-detail.html">
                    Review Annual Medical Research
                  </a>
                </h3>
                <p>
                  Donec tincidunt dictum purus, a blandit lorem tincidunt
                  euismod.
                </p>

                <div className="author">
                  <img
                    src="/images/author-image.jpg"
                    className="img-responsive"
                    alt=""
                  />
                  <div className="author-info">
                    <h5>Jason Stewart</h5>
                    <p>General Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    );
}

export default News;