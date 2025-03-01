import { useState, useRef } from "react";
import axios from "axios";

export default function MicrophoneInput() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for SpeechRecognition support
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Use useRef to persist the SpeechRecognition instance
  const recognitionRef = useRef(null);

  if (SpeechRecognition && !recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    // When speech is recognized, extract the transcript and call Gemini API via backend
    recognitionRef.current.onresult = async (event) => {
      const transcriptText = event.results[0][0].transcript;
      setTranscript(transcriptText);
      setLoading(true);
      try {
        // Call your backend endpoint with the transcribed text
        const res = await axios.post("http://127.0.0.1:8000/ai/hint", {
          question: transcriptText,
        });
        setAiResponse(res.data.hint);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiResponse("Error: Unable to get AI response.");
      } finally {
        setLoading(false);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setRecording(false);
    };
  }

  const toggleRecording = () => {
    if (!recording) {
      try {
        recognitionRef.current.start();
        setRecording(true);
        setTranscript("");
        setAiResponse("");
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    } else {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg">
      <button
        onClick={toggleRecording}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <p className="text-gray-700">
        {recording ? "Recording in progress..." : "Not recording"}
      </p>
      {transcript && (
        <div className="mt-4 p-4 border rounded-lg w-full">
          <h3 className="font-semibold">Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
      {loading ? (
        <p className="text-blue-600">Processing voice input...</p>
      ) : aiResponse ? (
        <div className="mt-4 p-4 border rounded-lg w-full">
          <h3 className="font-semibold">AI Response:</h3>
          <p>{aiResponse}</p>
        </div>
      ) : null}
    </div>
  );
}