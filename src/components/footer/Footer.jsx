import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "./style.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer_head">
          <li>
            <a href="#">Terms Of Use</a>
          </li>
          <li>
            <a href="#"> Privacy-Policy</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Faqs</a>
          </li>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          dolor! Molestias soluta veritatis inventore accusantium, neque nisi
          aut error reprehenderit minima quidem earum culpa voluptatibus
          explicabo id autem eos odit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Expedita, optio.
        </p>
        <div className="footer_bottom">
          <li>
            <a href="#">
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="#">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <FaLinkedin />
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Footer;
