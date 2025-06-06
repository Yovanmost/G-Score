import { useState } from 'react';
import axios from 'axios';
import { SUBJECT_LABELS } from '../common/constants';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const StudentScoreChecker = () => {
  const [sbd, setSbd] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!sbd.trim()) return;

    try {
      const res = await axios.get(`${BASE_URL}/students/${sbd}`);
      setStudent(res.data);
      setError('');
    } catch {
      setStudent(null);
      setError('Không tìm thấy thí sinh.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-rubik px-4 py-10 sm:px-6">
      <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-blue-700">G-Score Search</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Input SBD to search for score</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={sbd}
            onChange={(e) => setSbd(e.target.value)}
            placeholder="01000008"
            className="flex-1 w-full min-w-0 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCheck}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {student && (
          <div className="mt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Result</h2>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Student Info</h3>
              <p className="mb-4"><span className="font-medium">SBD:</span> {student.sbd}</p>

              <h3 className="text-md font-semibold text-gray-700 mb-2">Score</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-t border-gray-200 text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="py-1 pr-4">Subject</th>
                      <th className="py-1">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(student).map(([key, val]) => {
                      if (['sbd', 'createdAt', 'updatedAt'].includes(key)) return null;
                      return (
                        <tr key={key} className="border-b">
                          <td className="py-1 capitalize pr-4">{SUBJECT_LABELS[key] ?? key}</td>
                          <td className="py-1">{val ?? 'N/A'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentScoreChecker;
