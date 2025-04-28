const StatSection = () => {
  return (
    <section className="stats-section bg-blue-50 p-8 md:p-16 text-center">
      <div className="stats-content">
        <div className="content-header">
          <div className="tag text-center">Stats</div>
          <div className="tag-details">
            <h2 className="heading-secondary text-center">
              Hope Begins with a Single Penny.
            </h2>
          </div>
        </div>
        <div className="content-body grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-4xl font-bold text-white">5K+</p>
            <p className="text-white">People Helped</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">2K+</p>
            <p className="text-white">Donors</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">100+</p>
            <p className="text-white">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">200+</p>
            <p className="text-white">Volunteers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatSection;
