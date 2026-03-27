import { useNavigate } from "react-router-dom";
import Voice from "../components/Voice";
import Header from "../components/Header";

const VoicePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
        <Header title={"Voice"}/>
        <Voice />
    </div>
  );
};

export default VoicePage;