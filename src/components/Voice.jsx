import { useEffect, useRef, useState } from "react";
import { STATUS_MESSAGES } from "../utils/status-config";

const Voice = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const recognitionRef = useRef(null);

  // 🔥 Check mic permission on load
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: "microphone" });

        if (result.state === "denied") {
          setStatus("denied");
        } else {
          setStatus("idle");
        }
      } catch {
        setStatus("idle");
      }
    };

    checkPermission();
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("denied");
      return;
    }

    setStatus("start");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognitionRef.current = recognition;

    recognition.start();

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
      setStatus("active");
    };

    recognition.onerror = () => {
      setStatus("denied");
    };

    recognition.onend = () => {
      // If user stops speaking automatically
      if (status === "active") {
        setStatus("stop");
      }
    };
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setStatus("stop");
  };

  const currentStatus = STATUS_MESSAGES[status];

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-xl max-w-5xl mx-auto text-center">

      {/* 🎤 Button */}
      <button
        onClick={status === "active" ? stopListening : startListening}
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

      {/* 📊 Status */}
      <p className={`mt-4 text-sm ${currentStatus.color}`}>
        Status - {currentStatus.text}
      </p>

      {/* 📝 Transcript Box */}
      <div className="mt-4 p-3 bg-slate-700 rounded-lg min-h-[30vh] text-left">
        <p className="text-green-400">
          {text || "Your speech will appear here..."}
        </p>
      </div>

      {status === "denied" && (
        <p className="text-red-400 mt-2 text-sm">
            Please enable permission from browser settings
        </p>
        )}

    </div>
  );
};

export default Voice;