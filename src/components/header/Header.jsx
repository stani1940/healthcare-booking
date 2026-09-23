import "./Header.css";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import Hero from "./Hero";
function Header({ onAddDoctor }) {
    return ( 
        <>
            <TopBar />
            <NavBar onAddDoctor={onAddDoctor} />
            <Hero />
           
        </>
       );
}

export default Header;
