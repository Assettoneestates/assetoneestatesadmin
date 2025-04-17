import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Check,
  X,
  Edit,
  UserPlus,
  AlertCircle,
  Info,
} from "lucide-react";
import Layout from "../components/Layout";
import { Profile } from "../types";

interface CreateLandlordModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateLandlordModal: React.FC<CreateLandlordModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "https://assettone-rental-management-production.up.railway.app/super/api/v1/landlords/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      onSuccess();
    } catch (error) {
      console.error("Error creating landlord:", error);
      setError(
        "Failed to create landlord. Please check your information and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Add New Landlord
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-center text-red-700">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              placeholder="e.g., +1 (123) 456-7890"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center min-w-24 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Landlord"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ isActive, onChange, isLoading = false }) => {
  return (
    <div
      onClick={!isLoading ? onChange : undefined}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      } ${isActive ? "bg-green-500" : "bg-gray-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          isActive ? "translate-x-6" : "translate-x-1"
        } ${isLoading ? "opacity-70" : ""}`}
      />
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-3 w-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
    </div>
  );
};

const LandlordList = () => {
  const [landlords, setLandlords] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [statusCounts, setStatusCounts] = useState({ active: 0, inactive: 0 });

  useEffect(() => {
    fetchLandlords();
  }, []);

  const fetchLandlords = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(
        "https://assettone-rental-management-production.up.railway.app/super/api/v1/landlords/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLandlords(data);

      const activeCount = data.filter((l) => l.user.is_active).length;
      const inactiveCount = data.length - activeCount;
      setStatusCounts({ active: activeCount, inactive: inactiveCount });
    } catch (err) {
      console.error("Error fetching landlords:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    setTogglingIds((prev) => new Set(prev).add(id));

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `https://assettone-rental-management-production.up.railway.app/super/api/v1/landlords/${id}/toggle-status/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchLandlords();
    } catch (err) {
      console.error("Error toggling landlord status:", err);
    } finally {
      setTogglingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  const filteredLandlords = landlords.filter((landlord) => {
    const { first_name, last_name, email, is_active } = landlord.user;

    const matchesSearch =
      !searchTerm ||
      first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && is_active) ||
      (selectedStatus === "inactive" && !is_active);

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Landlords</h1>
            <p className="text-gray-500 mt-1">
              Manage property owners and their accounts
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <UserPlus size={18} className="mr-2" />
            Add Landlord
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-lg">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search landlords by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedStatus("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedStatus === "all"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({landlords.length})
              </button>
              <button
                onClick={() => setSelectedStatus("active")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedStatus === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active ({statusCounts.active})
              </button>
              <button
                onClick={() => setSelectedStatus("inactive")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedStatus === "inactive"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Inactive ({statusCounts.inactive})
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <p className="mt-3 text-gray-500">Loading landlords...</p>
              </div>
            </div>
          ) : filteredLandlords.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Info size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No landlords found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLandlords.map((landlord) => {
                    const isToggling = togglingIds.has(landlord.id);
                    return (
                      <tr key={landlord.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-700 text-sm font-medium">
                                {landlord.user.first_name.charAt(0)}
                                {landlord.user.last_name.charAt(0)}
                              </span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {landlord.user.first_name}{" "}
                              {landlord.user.last_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {landlord.user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {landlord.phone_number || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ToggleSwitch
                              isActive={landlord.user.is_active}
                              isLoading={isToggling}
                              onChange={() =>
                                handleToggleStatus(
                                  landlord.id,
                                  landlord.user.is_active,
                                )
                              }
                            />
                            <span
                              className={`ml-2 text-xs font-medium ${landlord.user.is_active ? "text-green-700" : "text-gray-500"}`}
                            >
                              {landlord.user.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="inline-flex items-center px-3 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200">
                              <Edit size={14} className="mr-1" />
                              Edit
                            </button>
                            <button className="inline-flex items-center px-3 py-1 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                              <Info size={14} className="mr-1" />
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination or "Show More" option would go here */}
          {filteredLandlords.length > 0 && (
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <div>
                Showing{" "}
                <span className="font-medium">{filteredLandlords.length}</span>{" "}
                of <span className="font-medium">{landlords.length}</span>{" "}
                landlords
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-green-50 border border-green-200 rounded-md text-green-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateLandlordModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchLandlords();
          }}
        />
      )}
    </Layout>
  );
};

export default LandlordList;
