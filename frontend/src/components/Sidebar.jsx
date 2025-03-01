import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="w-64 bg-gray-100 shadow-md p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className={`block p-2 rounded ${
                active === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => onSelect("dashboard")}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`block p-2 rounded ${
                active === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => onSelect("profile")}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`block p-2 rounded ${
                active === "settings"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => onSelect("settings")}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  active: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};