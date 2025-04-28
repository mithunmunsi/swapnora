import { motion } from "framer-motion";

const StatSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="stats-tag">Stats</div>
          <h2 className="stats-title">Hope Begins with a Single Penny.</h2>
        </motion.div>

        <div className="stats-grid">
          {[
            { number: "5K+", label: "People Helped" },
            { number: "2K+", label: "Donors" },
            { number: "100+", label: "Projects Completed" },
            { number: "200+", label: "Volunteers" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stats-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="stats-number">{stat.number}</p>
              <p className="stats-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatSection;
