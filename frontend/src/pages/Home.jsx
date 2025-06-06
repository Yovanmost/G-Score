import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-rubik flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">G-Score System</h1>
        <p className="text-gray-600 mb-10">Welcome.</p>

        <div className="space-y-4">
          <Link
            to="/check-score"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition"
          >
            🎯 Search Scores
          </Link>
          <Link
            to="/score-report"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition"
          >
            📊 Score Report
          </Link>
          <Link
            to="/top-student"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition"
          >
            🏆 Top Student Score
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
