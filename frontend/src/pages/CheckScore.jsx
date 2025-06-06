import StudentScoreChecker from '../components/StudentScoreChecker';
import { Link } from 'react-router-dom';

const CheckScore = () => {
  return (
    <div className="min-h-screen bg-white font-rubik">
      <div className="mb-6 text-left max-w-xl mx-auto">
        <Link to="/" className="text-blue-600 hover:underline">← Return to Home</Link>
      </div>
      <StudentScoreChecker />
    </div>
  );
};

export default CheckScore;
