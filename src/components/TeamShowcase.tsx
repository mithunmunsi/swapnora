import { Link } from "react-router-dom";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  category: "core" | "advisor" | "volunteer";
}

const teamMembers: TeamMember[] = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    photo: "/images/team/alice.jpg",
    category: "core",
  },
  {
    name: "David Kim",
    role: "Tech Lead",
    photo: "/images/team/david.jpg",
    category: "core",
  },
  {
    name: "Dr. Linda Smith",
    role: "Senior Advisor",
    photo: "/images/team/linda.jpg",
    category: "advisor",
  },
  {
    name: "Mohammed Ali",
    role: "Volunteer Coordinator",
    photo: "/images/team/mohammed.jpg",
    category: "volunteer",
  },
];

const TeamShowcase = () => {
  const categories = {
    core: "Core Team",
    advisor: "Advisors",
    volunteer: "Volunteers",
  };

  return (
    <section className="team-section">
      <h2 className="section-title">Meet Our Team</h2>
      {Object.keys(categories).map((key) => {
        const filtered = teamMembers.filter(
          (member) => member.category === key
        );
        return (
          <div key={key} className="team-category">
            <h3 className="team-category-title">
              {categories[key as keyof typeof categories]}
            </h3>
            <div className="team-grid">
              {filtered.map((member) => (
                <Link
                  to={`/team/${member.name.toLowerCase().replace(/ /g, "-")}`}
                >
                  <div className="team-card">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="team-photo"
                    />
                    <h4 className="team-name">{member.name}</h4>
                    <p className="team-role">{member.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TeamShowcase;
