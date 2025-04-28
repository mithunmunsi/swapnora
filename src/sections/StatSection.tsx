const StatSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-tag">Stats</div>
          <h2 className="stats-title">Hope Begins with a Single Penny.</h2>
        </div>
        <div className="stats-grid">
          <div className="stats-item">
            <p className="stats-number">5K+</p>
            <p className="stats-label">People Helped</p>
          </div>
          <div className="stats-item">
            <p className="stats-number">2K+</p>
            <p className="stats-label">Donors</p>
          </div>
          <div className="stats-item">
            <p className="stats-number">100+</p>
            <p className="stats-label">Projects Completed</p>
          </div>
          <div className="stats-item">
            <p className="stats-number">200+</p>
            <p className="stats-label">Volunteers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatSection;
