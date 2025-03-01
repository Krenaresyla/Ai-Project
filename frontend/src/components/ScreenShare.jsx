// import React, { useState, useRef } from "react";
// import axios from "axios";

// export default function ScreenShare() {
//   const [stream, setStream] = useState(null);
//   const [voiceTranscript, setVoiceTranscript] = useState("");
//   const [aiFeedback, setAiFeedback] = useState("");
//   const [isVoiceRecording, setIsVoiceRecording] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const videoRef = useRef(null);
//   const recognitionRef = useRef(null);

//   // Start screen sharing and automatically start voice recording
//   const startScreenShareAndVoice = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//         audio: false,
//       });
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//       startVoiceRecording();
//     } catch (error) {
//       console.error("Error starting screen share:", error);
//     }
//   };

//   // Stop screen sharing and voice recording
//   const stopScreenShare = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//     if (isVoiceRecording) {
//       stopVoiceRecording();
//     }
//   };

//   // Start voice recognition using the Web Speech API
//   const startVoiceRecording = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition is not supported in this browser.");
//       return;
//     }
//     if (!recognitionRef.current) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = "en-US";

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setVoiceTranscript(transcript);
//         setIsVoiceRecording(false);
//         console.log("Voice transcript received:", transcript);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//         setIsVoiceRecording(false);
//       };
//     }
//     try {
//       recognitionRef.current.start();
//       setIsVoiceRecording(true);
//       setVoiceTranscript(""); // Clear any previous transcript
//     } catch (error) {
//       console.error("Error starting voice recording:", error);
//     }
//   };

//   const stopVoiceRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsVoiceRecording(false);
//     }
//   };

//   // Send the voice prompt (question) to the backend (Gemini AI integration)
//   const sendToAI = async () => {
//     if (!voiceTranscript) {
//       alert("No voice input detected. Please speak your question.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/ai/screen", {
//         question: voiceTranscript,
//       });
//       setAiFeedback(res.data.feedback);
//     } catch (error) {
//       // Log detailed error info
//       console.error(
//         "Error sending data to AI:",
//         error.response ? error.response.data : error.message
//       );
//       const errMsg =
//         error.response && error.response.data && error.response.data.detail
//           ? error.response.data.detail
//           : error.message;
//       setAiFeedback(`Error processing your query: ${errMsg}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg space-y-4">
//       <h2 className="text-xl font-semibold">
//         Screen Sharing & Voice Prompt Interaction
//       </h2>
      
//       {/* Screen Sharing Section */}
//       <div>
//         {stream ? (
//           <div>
//             <video
//               ref={videoRef}
//               autoPlay
//               className="w-full border rounded"
//               style={{ maxHeight: "400px" }}
//             />
//             <button
//               onClick={stopScreenShare}
//               className="bg-red-600 text-white px-4 py-2 rounded mt-2"
//             >
//               Stop Screen Share
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={startScreenShareAndVoice}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Start Screen Share & Open Microphone
//           </button>
//         )}
//       </div>
      
//       {/* Display Voice Transcript */}
//       {voiceTranscript && (
//         <div className="p-4 border rounded-lg bg-gray-50">
//           <h3 className="font-semibold">Voice Transcript:</h3>
//           <p>{voiceTranscript}</p>
//         </div>
//       )}
      
//       {/* Button to Send Query to AI */}
//       <div>
//         <button
//           onClick={sendToAI}
//           className="bg-purple-600 text-white px-4 py-2 rounded"
//           disabled={loading || !voiceTranscript}
//         >
//           {loading ? "Processing..." : "Send Query to AI"}
//         </button>
//       </div>
      
//       {/* Display AI Feedback */}
//       {aiFeedback && (
//         <div className="p-4 border rounded-lg bg-gray-50">
//           <h3 className="font-semibold">AI Feedback:</h3>
//           <p>{aiFeedback}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { createWorker } from "tesseract.js";

export default function ScreenShare() {
  const [stream, setStream] = useState(null);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [workerReady, setWorkerReady] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const voiceTimeoutRef = useRef(null);
  const workerRef = useRef(null);

  // Initialize Tesseract worker (using version 6 API)
  useEffect(() => {
    async function initWorker() {
      try {
        const worker = createWorker();
        workerRef.current = worker;
        // In Tesseract v6, you do not need to call worker.load()
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        setWorkerReady(true);
        console.log("OCR Worker is ready");
      } catch (error) {
        console.error("Error initializing Tesseract worker:", error);
        // Fallback: allow the component to render even if OCR fails
        setWorkerReady(true);
      }
    }
    initWorker();
    console.log("ScreenShare component mounted");
    return () => {
      if (workerRef.current && typeof workerRef.current.terminate === "function") {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Start screen sharing
  const startScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      console.log("Screen share started.");
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };

  // Stop screen sharing
  const stopScreenShare = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      console.log("Screen share stopped.");
    }
  };

  // Start continuous voice recognition with interim results
  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";
    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }
      const combinedTranscript = finalTranscript + interimTranscript;
      setVoiceTranscript(combinedTranscript);
      console.log("Voice transcript updated:", combinedTranscript);

      // Reset the timer whenever new speech is detected
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
      voiceTimeoutRef.current = setTimeout(() => {
        console.log("No speech detected for 5 seconds. Auto-sending query.");
        sendToAI();
      }, 5000);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
      // Optionally restart recognition if you want continuous capture
      // recognition.start();
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsVoiceRecording(true);
      setVoiceTranscript(""); // Clear previous transcript
      console.log("Voice recognition started.");
    } catch (error) {
      console.error("Error starting voice recognition:", error);
    }
  };

  // Stop voice recognition
  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsVoiceRecording(false);
      console.log("Voice recognition stopped.");
    }
    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current);
    }
  };

  // Combined start function: start screen sharing and voice recognition simultaneously
  const handleStart = async () => {
    await startScreenShare();
    startVoiceRecognition();
  };

  // Combined stop function: stop both processes
  const handleStop = () => {
    stopScreenShare();
    stopVoiceRecognition();
  };

  // Send the voice transcript to the backend (no OCR is used)
  const sendToAI = async () => {
    if (!voiceTranscript.trim()) {
      console.log("No voice transcript to send.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/ai/screen", {
        question: voiceTranscript,
        screen_context: "",
      });
      console.log("Backend response:", response.data);
      setAiFeedback(response.data.feedback);
      // Clear transcript after sending if desired
      setVoiceTranscript("");
    } catch (error) {
      console.error(
        "Error sending query to AI:",
        error.response ? error.response.data : error.message
      );
      const errMsg =
        error.response && error.response.data && error.response.data.detail
          ? error.response.data.detail
          : error.message;
      setAiFeedback(`Error processing your query: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Screen Sharing & Auto Voice Interaction</h2>

      {/* Control Buttons */}
      <div className="space-x-4">
        {!stream ? (
          <button onClick={handleStart} className="bg-blue-600 text-white px-4 py-2 rounded">
            Start Screen Share & Voice
          </button>
        ) : (
          <button onClick={handleStop} className="bg-red-600 text-white px-4 py-2 rounded">
            Stop Screen Share & Voice
          </button>
        )}
      </div>

      {/* Video Display */}
      {stream && (
        <div>
          <video
            ref={videoRef}
            autoPlay
            className="w-full border rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
      )}

      {/* Display Voice Transcript */}
      {voiceTranscript && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold">Voice Transcript:</h3>
          <p>{voiceTranscript}</p>
        </div>
      )}

      {/* Display AI Feedback */}
      {aiFeedback && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold">AI Feedback:</h3>
          <p>{aiFeedback}</p>
        </div>
      )}

      {/* Optional manual send button */}
      <div>
        <button
          onClick={sendToAI}
          className="bg-purple-600 text-white px-4 py-2 rounded"
          disabled={loading || !voiceTranscript.trim()}
        >
          {loading ? "Processing..." : "Send Query Manually"}
        </button>
      </div>
    </div>
  );
}