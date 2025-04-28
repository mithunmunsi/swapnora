// src/components/ProgressBar.tsx

const ProgressBar = () => {
  return (
    <div className="progress-bar-container">
      {/* Video or Image Preview */}
      <div className="image-container">
        <img
          src="https://economictimes.indiatimes.com/thumb/msid-78716158,width-1200,height-900,resizemode-4,imgsize-539699/charity-getty.jpg?from=mdr"
          alt="Fundraiser preview"
          className="image"
        />
        {/* Play button overlay */}
        <div className="play-button-container">
          <button className="play-button">▶️</button>
        </div>
      </div>

      {/* Amounts */}
      <div className="amounts">
        <span className="amount-raised">$16,320 raised</span>
        <span className="amount-goal">$30,000 goal</span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: "54%" }} // 16320/30000 ≈ 54%
        />
      </div>
    </div>
  );
};

export default ProgressBar;
