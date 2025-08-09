// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import { FiLayers, FiFolder } from "react-icons/fi";
import { fetchFolders } from "../config/api";

interface SidebarProps {
  onShowAll: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShowAll }) => {
  const [folders, setFolders] = useState<{ _id: string; totalItems: number }[]>(
    []
  );

  useEffect(() => {
    fetchFolders()
      .then(setFolders)
      .catch(console.error);
  }, []);

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
      {/* small header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Folders
        </h2>
      </div>

      {/* All Folders button (refreshes grid) */}
      <div className="p-4">
        <button
          onClick={onShowAll}
          className="
            flex items-center gap-2 w-full px-3 py-2 rounded-md
            bg-blue-600 text-white hover:bg-blue-700 transition
          "
        >
          <FiLayers size={18} />
          All Folders
        </button>
      </div>

      {/* actual folder list */}
      <nav className="flex-1 px-3 space-y-1">
        {folders.map(({ _id, totalItems }) => (
          <a
            key={_id}
            href="#"
            className="
              flex items-center gap-3 px-3 py-2 rounded-md text-sm
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors
            "
          >
            <FiFolder className="text-blue-500" />
            <span>{_id}</span>
            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
              {totalItems}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;