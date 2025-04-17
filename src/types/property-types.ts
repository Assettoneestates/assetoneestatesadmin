export interface Property {
  id: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  owner: string; // This is just the ID string, not an object
  owner_name: string; // Add this as a top-level property
  manager?: string; // This is also just an ID
  manager_name?: string; // Add this as a top-level property
  total_units: number;
  created_at: string;
}

export interface PropertyFormData {
  name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  owner_id: string;
  manager_id?: string;
}

export interface PropertyStatistics {
  property_id: string;
  property_name: string;
  total_units: number;
  occupied_units: number;
  vacant_units: number;
  occupancy_rate: number;
  unit_types: Array<{
    unit_type: string;
    count: number;
  }>;
}

export interface Owner {
  id: string;
  user: {
    first_name: string;
    owner_name: string;
    last_name: string;
    email: string;
  };
}
