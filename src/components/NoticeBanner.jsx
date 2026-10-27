import React from 'react';
import { Info } from 'lucide-react';

export default function NoticeBanner() {
  return (
    <aside className="demo-notice-bar" aria-label="Demonstration Notice">
      <div className="container demo-notice-container">
        <span className="demo-notice-badge">Demonstration</span>
        <p className="demo-notice-text">
          <strong>Notice:</strong> This frontend showcase displays clearly labelled fictional sample projects created to demonstrate layout, search, and filtering capabilities. It is not connected to a private company database or production APIs.
        </p>
      </div>
    </aside>
  );
}
