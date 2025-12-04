// src/components/DropdownPortal.js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function DropdownPortal({ open, buttonRef, children }) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    setMounted(true);
  }, [open, buttonRef]);

  if (!mounted || !open) return null;

  return ReactDOM.createPortal(
    <div
      style={{ position: "absolute", top: position.top, left: position.left, zIndex: 999 }}
      className="bg-white  text-purple-900   shadow-lg rounded-lg border"
    >
      {children}
    </div>,
    document.body
  );
}
