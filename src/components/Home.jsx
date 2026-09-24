import Header from "./header/Header";
import About from "./About";
import Team from "./Team";
import News from "./News";
import Appointment from "./Appointment";
import GoogleMap from "./GoogleMap";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Header />
      <About />
      <Team />
      <News />
      <Appointment />
      <GoogleMap />
      <Footer />
    </>
  );
}

export default Home;