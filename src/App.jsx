import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Artists from './pages/Artists';
import Timeline from './pages/Timeline';
import Analytics from './pages/Analytics';
import Search from './pages/Search';
import Playlists from './pages/Playlists';
import Achievements from './pages/Achievements';
import Upcoming from './pages/Upcoming';
import Insights from './pages/Insights';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/insights" element={<Insights />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
