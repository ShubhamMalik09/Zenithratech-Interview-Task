import { useEffect, useRef, useState } from "react";
import { STATUS_MESSAGES } from "../utils/status-config";

const Camera = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: "camera" });

        if (result.state === "granted") {
          setStatus("idle");
        } else if (result.state === "denied") {
          setStatus("denied");
        } else {
          setStatus("idle"); // prompt state
        }
      } catch {
        setStatus("idle");
      }
    };

    checkPermission();
  }, []);

  const startCamera = async () => {
    setStatus("start");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setStatus("active");
    } catch {
      setStatus("denied");
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setStatus("stop");
  };

  const currentStatus = STATUS_MESSAGES[status];

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-xl max-w-5xl mx-auto text-center">

      <video ref={videoRef} autoPlay className="rounded-lg h-[50vh] w-full mb-4" />

      <button
        onClick={status === "active" ? stopCamera : startCamera}
        disabled={status === "start"}
        className="btn w-full"
      >
        {status === "start"
          ? "Starting..."
          : status === "active"
          ? "Stop"
          : status === "denied"
          ? "Ask Permission"
          : "Start"}
      </button>

      <p className={`mt-4 text-sm ${currentStatus.color}`}>
        Status - {currentStatus.text}
      </p>

      {status === "denied" && (
        <p className="text-red-400 mt-2 text-sm">
            Please enable permission from browser settings
        </p>
        )}
    </div>
  );
};

export default Camera;