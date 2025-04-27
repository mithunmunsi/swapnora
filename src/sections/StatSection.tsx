const StatSection = () => {
  return (
    <section className="stats-section bg-blue-50 p-8 md:p-16 text-center">
      <div className="stats-content">
        <h2 className="text-3xl font-semibold mb-6 text-white">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-4xl font-bold text-white">5K+</p>
            <p className="text-white">People Helped</p>
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
