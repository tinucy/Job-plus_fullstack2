import React from "react";
import "./alert.scss";

export default function Alert({
  data: { message, details = [], type = "error" },
}) {
  if (!message) return null;
  return (
    <div className={`alert alert--${type}`}>
      <p className="alert__message">{message}</p>
      <ul className="alert__details">
        {details?.map(
          (
            detail,
            index //changed details to detail
          ) => (
            <li key={index} className="alert__details">
              {detail.message}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
