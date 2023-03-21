import React from "react";

function MovieCard({ src, children }) {
  return (
    <div className="picture">
      <img src={src} className="picture" />
      {children}
    </div>
  );
}

export default MovieCard;
