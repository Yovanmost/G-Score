import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CheckScore from './pages/CheckScore';
import ScoreDistri from './pages/ScoreDistri';
import TopStudent from './pages/TopStudent';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/check-score"
          element={
            <Layout>
              <CheckScore />
            </Layout>
          }
        />
        <Route
          path="/score-report"
          element={
            <Layout>
              <ScoreDistri />
            </Layout>
          }
        />
        <Route
          path="/top-student"
          element={
            <Layout>
              <TopStudent />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
