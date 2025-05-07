import { useParams } from "react-router-dom";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    bio: "Alice has over 15 years of experience leading nonprofit tech initiatives...",
    photo: "/images/team/alice.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/alicejohnson",
      twitter: "https://twitter.com/alicecharity",
      email: "alice@example.com",
    },
  },
  {
    name: "David Kim",
    role: "Tech Lead",
    bio: "David builds scalable platforms and oversees the entire engineering team...",
    photo: "/images/team/david.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/davidkim",
      email: "david@example.com",
    },
  },
  // Add more...
];

const TeamDetails = () => {
  const { name } = useParams();
  const member = teamMembers.find(
    (m) => m.name.toLowerCase().replace(/ /g, "-") === name?.toLowerCase()
  );

  if (!member) return <div className="team-details">Member not found.</div>;

  return (
    <div className="team-details">
      <div className="details-card">
        <img src={member.photo} alt={member.name} className="details-photo" />
        <div className="details-info">
          <h2>{member.name}</h2>
          <h4>{member.role}</h4>
          <p>{member.bio}</p>
          <div className="social-links">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}
            {member.socials.twitter && (
              <a href={member.socials.twitter} target="_blank" rel="noreferrer">
                Twitter
              </a>
            )}
            {member.socials.email && (
              <a href={`mailto:${member.socials.email}`}>Email</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
