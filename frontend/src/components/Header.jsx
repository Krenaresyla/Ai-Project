// import 'react';

// const Header = () => {
//   return (
//     <header className="bg-gray-800 text-white py-4 px-6">
//       <h1 className="text-2xl font-bold">AI Tutoring System</h1>
//     </header>
//   );
// };

// export default Header;

// import React from "react";
// import { Link } from "react-router-dom";
// import { LogOut, User } from "lucide-react";

// export default function Header({ user, onLogout }) {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         {/* Logo / Title */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           GenAI Tutor
//         </Link>
//         {/* Navigation Links */}
//         <nav className="space-x-4">
//           <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
//             Dashboard
//           </Link>
//           {user && user.role === "teacher" && (
//             <Link
//               to="/teacher/student-progress"
//               className="text-gray-700 hover:text-blue-600"
//             >
//               Student Progress
//             </Link>
//           )}
//           {user && user.role === "admin" && (
//             <Link
//               to="/admin/manage-users"
//               className="text-gray-700 hover:text-blue-600"
//             >
//               Manage Users
//             </Link>
//           )}
//         </nav>
//         {/* User Info */}
//         <div className="flex items-center">
//           {user ? (
//             <>
//               <span className="text-gray-700 mr-4 flex items-center">
//                 <User size={20} className="mr-1" />
//                 {user.name}
//               </span>
//               <button
//                 onClick={onLogout}
//                 className="text-gray-700 hover:text-blue-600 focus:outline-none"
//               >
//                 <LogOut size={20} />
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="text-gray-700 hover:text-blue-600">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }


// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { LogOut, User } from "lucide-react";
// import { AuthContext } from "../contexts/AuthContext";

// export default function Header() {
//   const { user, onLogout } = useContext(AuthContext);
  
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         {/* Logo / Title */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           GenAI Tutor
//         </Link>
//         {/* Navigation Links */}
//         <nav className="ml-6 space-x-4">
//           <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
//             Dashboard
//           </Link>
//           {user && user.role === "teacher" && (
//             <Link to="/teacher/student-progress" className="text-gray-700 hover:text-blue-600">
//               Student Progress
//             </Link>
//           )}
//           {user && user.role === "admin" && (
//             <Link to="/admin/manage-users" className="text-gray-700 hover:text-blue-600">
//               Manage Users
//             </Link>
//           )}
//         </nav>
//         {/* User Info */}
//         <div className="flex items-center">
//           {user ? (
//             <>
//               <span className="text-gray-700 mr-4 flex items-center">
//                 <User size={20} className="mr-1" />
//                 {user.name}
//               </span>
//               <button
//                 onClick={onLogout}
//                 className="text-gray-700 hover:text-blue-600 focus:outline-none"
//               >
//                 <LogOut size={20} />
//               </button>
//             </>
//           ) : (
//             <Link to="/login" className="text-gray-700 hover:text-blue-600">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

import { useContext } from "react";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const { user, onLogout } = useContext(AuthContext);
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          GenAI Tutor
        </Link>
        {/* Navigation Links */}
        <nav className="ml-6 space-x-4">
          <Link to="/Dashboard.jsx" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          {user && user.role === "teacher" && (
            <Link to="/teacher/student-progress" className="text-gray-700 hover:text-blue-600">
              Student Progress
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link to="/admin/manage-users" className="text-gray-700 hover:text-blue-600">
              Manage Users
            </Link>
          )}
        </nav>
        {/* User Info */}
        <div className="flex items-center">
          {user ? (
            <>
              <span className="text-gray-700 mr-4 flex items-center">
                <User size={20} className="mr-1" />
                {user.name}
              </span>
              <button
                onClick={onLogout}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}