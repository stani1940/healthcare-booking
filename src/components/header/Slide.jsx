function Slide({ className, subtitle, title, button, link, active }) {
  return (
    <div className={`item ${className} hero-slide ${active ? "active" : ""}`}>
      <div className="caption">
        <div className="col-md-offset-1 col-md-10">
          <h3>{subtitle}</h3>
          <h1>{title}</h1>

          <a
            href={link}
            className="section-btn btn btn-default smoothScroll"
          >
            {button}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Slide;