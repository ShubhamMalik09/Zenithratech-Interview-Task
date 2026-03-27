import { useNavigate } from "react-router-dom";
import Camera from "../components/Camera";
import Header from "../components/Header";

const CameraPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <Header title={"Camera"}/>

      <Camera />
    </div>
  );
};

export default CameraPage;