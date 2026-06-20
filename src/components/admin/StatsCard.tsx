import "./StatsCard.css";
interface Props {
  title: string;
  value: string | number;
  icon: string;
}

const StatsCard = ({ title, value, icon }: Props) => {
  return (
    <div className="stats-card">
      <div className="stats-card-icon">{icon}</div>

      <div>
        <h4>{title}</h4>

        <p>{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
