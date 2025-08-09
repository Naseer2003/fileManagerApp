import React, { useEffect, useState } from "react";
import { FiLayers, FiFolder } from "react-icons/fi";
import { fetchFolders } from "../config/api";

interface SidebarProps {
  onShowAll: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShowAll }) => {
  const [folders, setFolders] = useState<{ _id: string; totalItems: number }[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    fetchFolders()
      .then(setFolders)
      .catch(console.error);
  }, []);

  const handleClick = (name: string, callback?: () => void) => {
    setSelected(name);
    if (callback) callback();
  };

  const staticButtons = [
    "All Folders",
    "Brochures",
    "Offline Marketing",
    "Reels",
    "Static Posts",
    "LOGO'S",
    "WEBSITES",
  ];

  return (
    <aside
      className="
        w-64 h-[calc(100vh-56px)]
        bg-white dark:bg-gray-800
        border-r border-gray-200 dark:border-gray-700
        flex flex-col
        overflow-y-auto transition-colors
      "
    >
      {/* Sidebar header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Folders
        </h2>
      </div>

      {/* Static buttons */}
      <div className="p-4 space-y-3">
        {staticButtons.map((label) => (
          <button
            key={label}
            onClick={() =>
              handleClick(label, label === "All Folders" ? onShowAll : undefined)
            }
            className={`
              flex items-center gap-2 w-full px-3 py-4 rounded-md transition
              ${selected === label
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            <FiLayers size={18} />
            {label}
          </button>
        ))}
      </div>


    </aside>
  );
};

export default Sidebar;
