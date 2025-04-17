"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Search,
  Home,
  Edit,
  Trash2,
  BarChart3,
  MapPin,
  Building,
} from "lucide-react";
import Layout from "../components/Layout";
import CreatePropertyModal from "../components/modals/create-property-modal";
import EditPropertyModal from "../components/modals/edit-property-modal";
import PropertyStatisticsModal from "../components/modals/property-statistics-modal";
import DeleteConfirmationModal from "../components/modals/delete-confirmation-modal";
import { PropertyService } from "../services/property-service";
import type {
  Property,
  Owner,
  PropertyStatistics,
} from "../types/property-types";

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [propertyStatistics, setPropertyStatistics] =
    useState<PropertyStatistics | null>(null);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [locationCounts, setLocationCounts] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    fetchProperties();
    fetchLandlords();
  }, []);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const data = await PropertyService.getProperties();
      setProperties(data);

      // Count properties by city
      const cities = data.reduce(
        (acc: Record<string, number>, property: Property) => {
          const city = property.city;
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        },
        {},
      );

      setLocationCounts(cities);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLandlords = async () => {
    try {
      const data = await PropertyService.getLandlords();
      setOwners(data);
    } catch (err) {
      console.error("Error fetching landlords:", err);
    }
  };

  const fetchPropertyStatistics = async (propertyId: string) => {
    setIsLoadingStatistics(true);
    setPropertyStatistics(null);

    try {
      const data = await PropertyService.getPropertyStatistics(propertyId);
      setPropertyStatistics(data);
    } catch (err) {
      console.error("Error fetching property statistics:", err);
    } finally {
      setIsLoadingStatistics(false);
    }
  };

  const handleDeleteProperty = async () => {
    if (!selectedProperty) return;

    setIsDeleting(true);
    try {
      await PropertyService.deleteProperty(selectedProperty.id);
      fetchProperties();
      setShowDeleteModal(false);
      setSelectedProperty(null);
    } catch (err) {
      console.error("Error deleting property:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewStatistics = (property: Property) => {
    setSelectedProperty(property);
    setShowStatisticsModal(true);
    fetchPropertyStatistics(property.id);
  };

  const filteredProperties = properties.filter((property) => {
    const { name, address_line1, city, state, postal_code, country } = property;

    const matchesSearch =
      !searchTerm ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address_line1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      postal_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === "all" || city === selectedLocation;

    return matchesSearch && matchesLocation;
  });

  return (
    <Layout>
      <div className="space-y-6 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Properties</h1>
            <p className="text-gray-500 mt-1">
              Manage your real estate portfolio and property details
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Building size={18} className="mr-2" />
            Add Property
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
                placeholder="Search properties by name, address, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLocation("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedLocation === "all"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({properties.length})
              </button>

              {Object.entries(locationCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([city, count]) => (
                  <button
                    key={city}
                    onClick={() => setSelectedLocation(city)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      selectedLocation === city
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {city} ({count})
                  </button>
                ))}
            </div>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <p className="mt-3 text-gray-500">Loading properties...</p>
              </div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Home size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No properties found</p>
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
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-green-100 h-10 w-10 rounded-md flex items-center justify-center mr-3">
                            <Building size={20} className="text-green-700" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {property.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {property.address_line1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <MapPin size={14} className="text-gray-400 mr-1" />
                          <div className="text-sm text-gray-500">
                            {property.city}, {property.state}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {property.country}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {property.owner.user.first_name}{" "}
                          {property.owner.user.last_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {property.owner.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.total_units || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProperty(property);
                              setShowEditModal(true);
                            }}
                            className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                          >
                            <Edit size={14} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleViewStatistics(property)}
                            className="inline-flex items-center px-3 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
                          >
                            <BarChart3 size={14} className="mr-1" />
                            Stats
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProperty(property);
                              setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center px-3 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredProperties.length > 0 && (
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <div>
                Showing{" "}
                <span className="font-medium">{filteredProperties.length}</span>{" "}
                of <span className="font-medium">{properties.length}</span>{" "}
                properties
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
        <CreatePropertyModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchProperties();
          }}
          owners={owners}
        />
      )}

      {showEditModal && selectedProperty && (
        <EditPropertyModal
          onClose={() => {
            setShowEditModal(false);
            setSelectedProperty(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedProperty(null);
            fetchProperties();
          }}
          property={selectedProperty}
          owners={owners}
        />
      )}

      {showDeleteModal && selectedProperty && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProperty(null);
          }}
          onConfirm={handleDeleteProperty}
          propertyName={selectedProperty.name}
          isDeleting={isDeleting}
        />
      )}

      {showStatisticsModal && (
        <PropertyStatisticsModal
          onClose={() => {
            setShowStatisticsModal(false);
            setPropertyStatistics(null);
            setSelectedProperty(null);
          }}
          statistics={propertyStatistics}
          isLoading={isLoadingStatistics}
        />
      )}
    </Layout>
  );
};

export default PropertyList;
