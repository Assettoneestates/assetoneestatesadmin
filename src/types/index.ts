export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface Profile {
  id: string;
  user: User;
  phone_number: string;
  last_session: string;
}

export interface DashboardData {
  landlord_count: number;
  active_landlords: number;
  inactive_landlords: number;
  property_count: number;
  recent_activity: Profile[];
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}