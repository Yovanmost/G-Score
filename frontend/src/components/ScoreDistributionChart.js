import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { SUBJECT_LABELS } from '../common/constants';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LEVEL_MAP = {
  '>=8': '>=8',
  '6-7.99': '6-8',
  '4-5.99': '4-6',
  '<4': '<4',
};

const ScoreDistributionChart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [activeSubjects, setActiveSubjects] = useState([]);
  const [activeLevels, setActiveLevels] = useState(Object.values(LEVEL_MAP));

  const allLevels = Object.values(LEVEL_MAP);

  useEffect(() => {
    const fetchScoreDistribution = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/students/report/score-distribution`);
        const rawData = res.data;

        const transformedData = Object.entries(rawData).map(([subject, scoreDist]) => {
          const subjectData = { subject };
          for (const [rawLevel, label] of Object.entries(LEVEL_MAP)) {
            subjectData[label] = scoreDist[rawLevel] || 0;
          }
          return subjectData;
        });

        setData(transformedData);
        const subjectsList = Object.keys(rawData);
        setSubjects(subjectsList);
        setActiveSubjects(subjectsList);
        setFilteredData(transformedData);
      } catch (err) {
        console.error('Failed to fetch score distribution:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchScoreDistribution();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => activeSubjects.includes(item.subject));
    const levelFiltered = filtered.map((item) => {
      const filteredItem = { subject: item.subject };
      activeLevels.forEach((level) => {
        filteredItem[level] = item[level];
      });
      return filteredItem;
    });
    setFilteredData(levelFiltered);
  }, [data, activeSubjects, activeLevels]);

  const toggleLevel = (level) => {
    setActiveLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleSubject = (subject) => {
    setActiveSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Score Report</h2>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-6">
        <div className="w-full md:w-1/2">
          <span className="font-medium">Subject:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {subjects.map((subj) => (
              <label key={subj} className="flex items-center space-x-1 text-sm">
                <input
                  type="checkbox"
                  checked={activeSubjects.includes(subj)}
                  onChange={() => toggleSubject(subj)}
                  className="accent-blue-500"
                />
                {/* Use the label here */}
                <span>{SUBJECT_LABELS[subj] || subj}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <span className="font-medium">Score Level:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {allLevels.map((level) => (
              <label key={level} className="flex items-center space-x-1 text-sm">
                <input
                  type="checkbox"
                  checked={activeLevels.includes(level)}
                  onChange={() => toggleLevel(level)}
                  className="accent-blue-500"
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Chart or Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500 text-base animate-pulse">Loading chart...</div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No info</div>
      ) : (
        <div className="w-full h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
              barCategoryGap={filteredData.length > 5 ? '10%' : '30%'}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="subject"
                tickFormatter={(subject) => SUBJECT_LABELS[subject] || subject} // Label on x-axis
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-30}
                textAnchor="end"
              />
              <YAxis
                tick={{ fontSize: 10 }}
                width={40}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {activeLevels.includes('>=8') && <Bar dataKey=">=8" stackId="a" fill="#4ade80" />}
              {activeLevels.includes('6-8') && <Bar dataKey="6-8" stackId="a" fill="#facc15" />}
              {activeLevels.includes('4-6') && <Bar dataKey="4-6" stackId="a" fill="#f97316" />}
              {activeLevels.includes('<4') && <Bar dataKey="<4" stackId="a" fill="#ef4444" />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ScoreDistributionChart;
