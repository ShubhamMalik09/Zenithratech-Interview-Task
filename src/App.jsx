import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CameraPage from "./pages/CameraPage";
import VoicePage from "./pages/VoicePage";
import BluetoothPage from "./pages/BluetoothPage";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/bluetooth" element={<BluetoothPage />} />
      </Routes>
    </div>
  );
};

export default App;