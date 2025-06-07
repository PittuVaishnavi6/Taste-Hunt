
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-10 soft-yellow-bg" style={{ fontFamily: '"Playfair Display", serif' }}>
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h3 className="text-lg font-bold accent-text">TasteHunt</h3>
          <p className="text-sm text-muted-foreground">
            Sustainable food delivery with fraud detection and waste management.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-3 accent-text">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:accent-text transition font-playfair">Home</Link>
            </li>
            <li>
              <Link to="/restaurants" className="text-muted-foreground hover:accent-text transition font-playfair">Restaurants</Link>
            </li>
            <li>
              <Link to="/profile" className="text-muted-foreground hover:accent-text transition font-playfair">My Account</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-3 accent-text">About Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:accent-text transition font-playfair">Our Mission</Link>
            </li>
            <li>
              <Link to="/" className="text-muted-foreground hover:accent-text transition font-playfair">Sustainability</Link>
            </li>
            <li>
              <Link to="/" className="text-muted-foreground hover:accent-text transition font-playfair">Waste Reduction</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-3 accent-text">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:accent-text transition font-playfair">Contact Us</Link>
            </li>
            <li>
              <Link to="/" className="text-muted-foreground hover:accent-text transition font-playfair">FAQs</Link>
            </li>
            <li>
              <Link to="/" className="text-muted-foreground hover:accent-text transition font-playfair">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} <span className="accent-text font-bold">TasteHunt</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
