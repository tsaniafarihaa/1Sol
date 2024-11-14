import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by 1Sol Industries Ltd</p>
      </aside>
    </footer>
  );
};

export default Footer;
