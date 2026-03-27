import { useEffect, useRef, useState } from "react";
import { STATUS_MESSAGES } from "../utils/status-config";

const Voice = () => {
  const [text, setText] = useState("");
  const [finalText, setFinalText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [status, setStatus] = useState("idle");

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("denied");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        let interim = "";
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                final += transcript + " ";
            } else {
                interim += transcript;
            }
        }
        
        if (final) {
            setFinalText((prev) => prev + final);
        }
        setInterimText(interim);
    };

    recognition.onerror = () => {
      setStatus("denied");
      isListeningRef.current = false;
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, []);

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
    if (!recognitionRef.current) return;

    isListeningRef.current = true;
    setStatus("start");

    try {
      recognitionRef.current.start();
      setStatus("active");
    } catch {
      setStatus('permission Denied')
    }
  };

  const stopListening = () => {
    isListeningRef.current = false;
    recognitionRef.current?.stop();
    setStatus("stop");
  };

  const currentStatus = STATUS_MESSAGES[status];

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-xl max-w-5xl mx-auto text-center">

      <button
        onClick={status === "active" ? stopListening : startListening}
        disabled={status === "start"}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
      >
        {status === "start"
          ? "Starting..."
          : status === "active"
          ? "Stop Listening"
          : status === "denied"
          ? "Enable Permission"
          : "Start Listening"}
      </button>

      <p className={`mt-4 text-sm ${currentStatus.color}`}>
        Status - {currentStatus.text}
      </p>

      <div className="mt-4 p-4 bg-slate-700 rounded-xl min-h-[30vh] text-left">
        <p className="text-green-400 whitespace-pre-wrap">
            {finalText}
            <span className="opacity-50">{interimText}</span>
        </p>
      </div>

      {status === "denied" && (
        <p className="text-red-400 mt-3 text-sm">
          Please enable microphone access from browser settings
        </p>
      )}
    </div>
  );
};

export default Voice;