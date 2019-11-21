import React from "react";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <div className='tag-container'>
        <div className="tags">FlowCharts</div>
        <div className="tags">Wireframes</div>
        <div className="tags">Prototype</div>
        <div className="tags">Test</div>
        <div className="tags">Launch</div>
      </div>
    </div>
  );
}
