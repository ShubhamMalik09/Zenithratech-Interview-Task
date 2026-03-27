import { useState } from "react";
import { STATUS_MESSAGES } from "../utils/status-config";

const Bluetooth = () => {
  const [device, setDevice] = useState("");
  const [status, setStatus] = useState("idle");

  const connectDevice = async () => {
    setStatus("start");

    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      setDevice(device.name || "Unknown Device");
      setStatus("active");
    } catch (err) {
      // User cancels or permission denied
      setStatus("denied");
    }
  };

  const currentStatus = STATUS_MESSAGES[status];

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-xl max-w-md mx-auto text-center">

      <button
        onClick={connectDevice}
        disabled={status === "start"}
        className="btn w-full"
      >
        {status === "start"
          ? "Scanning..."
          : status === "active"
          ? "Scan Again"
          : status === "denied"
          ? "Retry"
          : "Scan Devices"}
      </button>

      <p className={`mt-4 text-sm ${currentStatus.color}`}>
        Status - {currentStatus.text}
      </p>

      <div className="mt-4 p-3 bg-slate-700 rounded-lg min-h-[80px]">
        <p className="text-blue-400 text-xl">
          {device || "No device connected"}
        </p>
      </div>

    </div>
  );
};

export default Bluetooth;