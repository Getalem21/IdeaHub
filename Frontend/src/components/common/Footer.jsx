import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer-logo">
        <img src="/logo.png" alt="Company Logo" />
      </div>

      {/* Contact Info */}
      <div className="footer-contact">
        <p>Contact us: <a href="mailto:support@example.com">support@example.com</a> | +251 (955) 123-4567</p>
        <p>Megenagna, Addis Ababa, Ethiopia</p>
      </div>

      {/* Social Links */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/facebook.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/twitter.png" alt="Twitter" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/instagram.png" alt="Instagram" />
        </a>
      </div>

      {/* Subscription Form */}
      <div className="footer-subscribe">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Subscribe via email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Copyright */}
      <div className="footer-copy">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
