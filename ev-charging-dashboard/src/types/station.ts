export enum StationStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  OFFLINE = 'offline',
  ERROR = 'error',
  MAINTENANCE = 'maintenance',
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ChargingSession {
  sessionId: string;
  userId: string;
  startTime: string;
  energyDispensed: number;
  currentPower: number;
}

export interface Station {
  id: string;
  name: string;
  location: Location;
  status: StationStatus;
  powerCapacity: number;
  currentOutput: number;
  session: ChargingSession | null;
  lastHeartbeat: string;
  hardwareVersion: string;
  firmwareVersion: string;
}

export interface StationFilters {
  status?: StationStatus[];
  search?: string;
  sortBy?: 'name' | 'status' | 'location' | 'lastHeartbeat';
  sortOrder?: 'asc' | 'desc';
}
