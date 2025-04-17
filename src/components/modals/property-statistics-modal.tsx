"use client";

import type React from "react";
import { BarChart3, Trash2 } from "lucide-react";
import type { PropertyStatistics } from "../../types/property-types";

interface PropertyStatisticsModalProps {
  onClose: () => void;
  statistics: PropertyStatistics | null;
  isLoading: boolean;
}

const PropertyStatisticsModal: React.FC<PropertyStatisticsModalProps> = ({
  onClose,
  statistics,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl animate-fadeIn">
          <div className="h-48 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              <p className="mt-3 text-gray-500">Loading statistics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {statistics.property_name} Statistics
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 font-medium">Total Units</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {statistics.total_units}
              </h3>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 font-medium">Occupancy Rate</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {statistics.occupancy_rate}%
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 font-medium">Occupied Units</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {statistics.occupied_units}
              </h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 font-medium">Vacant Units</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {statistics.vacant_units}
              </h3>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">
              Units by Type
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              {statistics.unit_types.length > 0 ? (
                <ul className="space-y-2">
                  {statistics.unit_types.map((type, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{type.unit_type}</span>
                      <span className="font-medium">{type.count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-2">
                  No unit types data available
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyStatisticsModal;
