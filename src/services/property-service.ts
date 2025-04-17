import api from "../utils/api";
import type {
  Property,
  PropertyFormData,
  PropertyStatistics,
} from "../types/property-types";

export const PropertyService = {
  // Get all properties
  getProperties: async (): Promise<Property[]> => {
    const { data } = await api.get("/super/api/v1/properties/");
    return data;
  },

  // Create a new property
  createProperty: async (propertyData: PropertyFormData): Promise<Property> => {
    const { data } = await api.post(
      "/super/api/v1/properties/create/",
      propertyData,
    );
    return data;
  },

  // Update an existing property
  updateProperty: async (
    propertyId: string,
    propertyData: PropertyFormData,
  ): Promise<Property> => {
    const { data } = await api.put(
      `/super/api/v1/properties/${propertyId}/update/`,
      propertyData,
    );
    return data;
  },

  // Delete a property
  deleteProperty: async (propertyId: string): Promise<void> => {
    await api.delete(`/super/api/v1/properties/${propertyId}/delete/`);
  },

  // Get property statistics
  getPropertyStatistics: async (
    propertyId: string,
  ): Promise<PropertyStatistics> => {
    const { data } = await api.get(
      `/super/api/v1/properties/${propertyId}/statistics/`,
    );
    return data;
  },

  // Get all landlords/owners
  getLandlords: async () => {
    const { data } = await api.get("/super/api/v1/landlords/");
    return data;
  },
};
