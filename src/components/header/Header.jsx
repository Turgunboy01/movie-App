import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/movix-logo.png";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import "./style.scss";
const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSerach, setShowSerach] = useState(false);
  const navigate = useNavigate();
  const locaton = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locaton]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSerach(true);
  };
  const openMobilMenu = () => {
    setShowSerach(false);
    setMobileMenu(true);
  };

  const navigateHandler = (type) => {
    if (type == "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  const searchHandlerQuery = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSerach(false);
      }, 1000);
    }
  };

  return (
    <div className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div className="container">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigateHandler("movie")}>
            Kinolar
          </li>
          <li className="menuItem" onClick={() => navigateHandler("tv")}>
            Seriallar
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobilMenu} />
          )}
        </div>
      </div>
      {showSerach && (
        <div className="search__bar">
          <div className="container">
            <input
              type="text"
              placeholder="Kino va Seriallarni qidirish uchun..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchHandlerQuery}
            />
            <VscChromeClose onClick={() => setShowSerach(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
