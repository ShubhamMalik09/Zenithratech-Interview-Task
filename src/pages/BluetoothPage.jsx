import { useNavigate } from "react-router-dom";
import Bluetooth from "../components/Bluetooth";
import Header from "../components/Header";

const BluetoothPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <Header title={"Bluetooth"}/>

      <Bluetooth />
    </div>
  );
};

export default BluetoothPage;