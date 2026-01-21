export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  stationAccess: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DriverFormData {
  firstName: string;
  lastName: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  stationAccess: string[];
}

export interface DriverFilters {
  search?: string;
  sortBy?: 'firstName' | 'lastName' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
