import { useEffect, useState } from "react";
import Slide from "./Slide";

function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="slider">
      <div className="container">
        <div className="row">

          <Slide
            className="item-first"
            subtitle="Let's make your life happier"
            title="Healthy Living"
            button="Meet Our Doctors"
            link="#team"
            active={slide === 0}
          />

          <Slide
            className="item-second"
            subtitle="Aenean luctus lobortis tellus"
            title="New Lifestyle"
            button="More About Us"
            link="#about"
            active={slide === 1}
          />

          <Slide
            className="item-third"
            subtitle="Pellentesque nec libero nisi"
            title="Your Health Benefits"
            button="Read Stories"
            link="#news"
            active={slide === 2}
          />

        </div>
      </div>
    </section>
  );
}

export default Hero;