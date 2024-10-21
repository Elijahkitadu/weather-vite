// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/insights">Admin Insights</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
