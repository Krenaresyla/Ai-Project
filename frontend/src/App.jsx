/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

*/

/*

import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-blue-600">GenAI Tutoring App</h1>
      <p className="text-lg text-gray-700">Welcome to the AI-powered learning platform.</p>

      <div className="mt-5">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
*/

// import 'react';
// import Header from './components/Header';
// import AIInteraction from './components/AIinteraction';

// const App = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <AIInteraction />
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import Header from "./components/Header";
// import { Outlet } from "react-router-dom";

// export default function App() {
//   // Define user state here
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Simulate fetching the user data from local storage or an API
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Implement your logout logic (e.g., clear token, remove user info)
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <div>
//       {/* Pass user and onLogout to Header */}
//       <Header user={user} onLogout={handleLogout} />
//       <Outlet />
//     </div>
//   );
// }

// import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import AIInteraction from "./components/AIinteraction";
import MicrophoneInput from "./components/MicrophoneInput";
import ScreenShare from "./components/Screenshare";


export default function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Outlet />
        <AIInteraction/>
        <MicrophoneInput/>
        <ScreenShare/>
      </main>
    </AuthProvider>
  );
}