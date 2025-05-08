import React from "react";

export default function PrimaryButton({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        background: disabled
          ? "#555" // muted gray when disabled
          : "linear-gradient(135deg, #00ffcc, #009999)",
        color: disabled ? "#888" : "#000",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: "1rem",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          e.currentTarget.style.boxShadow = "0 0 12px rgba(0,255,204,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
}
