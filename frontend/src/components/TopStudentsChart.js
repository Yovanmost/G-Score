import { useEffect, useState } from 'react';
import axios from 'axios';
import { SUBJECT_LABELS } from '../common/constants';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TopStudentsChart = () => {
  const [subject1, setSubject1] = useState('toan');
  const [subject2, setSubject2] = useState('ly');
  const [subject3, setSubject3] = useState('hoa');
  const [n, setN] = useState(5);
  const [nInput, setNInput] = useState('5');
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const subjects = Object.keys(SUBJECT_LABELS);

  useEffect(() => {
    const parsed = parseInt(nInput);
    if (!isNaN(parsed)) setN(parsed);
  }, [nInput]);

  useEffect(() => {
    const fetchTopStudents = async () => {
      if (n === 0) return;

      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/students/top`, {
          params: { subject1, subject2, subject3, n },
        });
        setTopStudents(res.data);
      } catch (err) {
        console.error('Failed to fetch top students:', err);
        setTopStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStudents();
  }, [subject1, subject2, subject3, n]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4 py-6 bg-white shadow rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        {n > 0 ? `Top ${n} Student` : `Bottom ${Math.abs(n)} Student`} by 3 subjects
      </h2>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Subject 1</label>
          <select
            value={subject1}
            onChange={(e) => setSubject1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Subject 2</label>
          <select
            value={subject2}
            onChange={(e) => setSubject2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Subject 3</label>
          <select
            value={subject3}
            onChange={(e) => setSubject3(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Input amount of top student</label>
          <input
            type="number"
            inputMode="numeric"
            value={nInput}
            onChange={(e) => setNInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g. 10 or -10"
          />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading data...</div>
      ) : topStudents.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No data.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="border px-4 py-2">SBD</th>
                <th className="border px-4 py-2">{SUBJECT_LABELS[subject1]}</th>
                <th className="border px-4 py-2">{SUBJECT_LABELS[subject2]}</th>
                <th className="border px-4 py-2">{SUBJECT_LABELS[subject3]}</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((student) => (
                <tr key={student.sbd} className="text-center text-sm">
                  <td className="border px-4 py-2">{student.sbd}</td>
                  <td className="border px-4 py-2">{student[subject1]}</td>
                  <td className="border px-4 py-2">{student[subject2]}</td>
                  <td className="border px-4 py-2">{student[subject3]}</td>
                  <td className="border px-4 py-2 font-semibold">{student.total_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopStudentsChart;
