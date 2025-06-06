import ScoreDistributionChart from '../components/ScoreDistributionChart';
import { Link } from 'react-router-dom';

const ScoreDistri = () => {
  return (
    <div className="min-h-screen bg-white font-rubik px-4 py-6">
      <div className="mb-6 text-left max-w-xl mx-auto">
        <Link to="/" className="text-blue-600 hover:underline">← Return to Home</Link>
      </div>
      <ScoreDistributionChart />
    </div>
  );
};

export default ScoreDistri;
