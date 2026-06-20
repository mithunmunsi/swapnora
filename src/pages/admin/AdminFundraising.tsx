import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminFundraising.css";
interface Project {
  _id: string;
  title: string;
  category: string;
  raisedAmount: number;
  targetAmount: number;
  totalVotes: number;
  fundingStatus: string;
}

const AdminFundraising = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get("/admin/fundraising");

      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-fundraising">
      <h1>Fundraising Analytics</h1>

      <table>
        <thead>
          <tr>
            <th>Project</th>

            <th>Category</th>

            <th>Raised</th>

            <th>Goal</th>

            <th>Progress</th>

            <th>Votes</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => {
            const progress = (
              (project.raisedAmount / project.targetAmount) *
              100
            ).toFixed(1);

            return (
              <tr key={project._id}>
                <td>{project.title}</td>

                <td>{project.category}</td>

                <td className="amount-raised">
                  €{project.raisedAmount.toLocaleString()}
                </td>

                <td className="amount-goal">
                  €{project.targetAmount.toLocaleString()}
                </td>

                <td className="progress-cell">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(Number(progress), 100)}%`,
                      }}
                    />
                  </div>

                  <span className="progress-text">{progress}%</span>
                </td>

                <td>{project.totalVotes}</td>

                <td>
                  <span className={`funding-status ${project.fundingStatus}`}>
                    {project.fundingStatus}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFundraising;
