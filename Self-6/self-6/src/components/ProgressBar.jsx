import React from "react";

const ProgressBar = ({ title, progress, onCancel }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-header">
        <span>{title}</span>
        <button className="cancel-button" onClick={onCancel}>
          Отмена
        </button>
      </div>
      <div className="progress-content">
        {typeof progress === "number" ? (
          <>
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="progress-text">{progress}%</span>
          </>
        ) : (
          <span className="progress-text">{progress}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
