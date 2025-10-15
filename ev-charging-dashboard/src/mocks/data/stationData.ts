import { Station, StationStatus, ChargingSession } from '../../types/station';

const locations = [
  {
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90012',
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    address: '789 Pine Blvd',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92101',
    coordinates: { lat: 32.7157, lng: -117.1611 },
  },
  {
    address: '321 Elm St',
    city: 'San Jose',
    state: 'CA',
    zipCode: '95110',
    coordinates: { lat: 37.3382, lng: -121.8863 },
  },
  {
    address: '654 Maple Dr',
    city: 'Sacramento',
    state: 'CA',
    zipCode: '95814',
    coordinates: { lat: 38.5816, lng: -121.4944 },
  },
];

const generateSession = (): ChargingSession => ({
  sessionId: `session-${Math.random().toString(36).substr(2, 9)}`,
  userId: `user-${Math.random().toString(36).substr(2, 9)}`,
  startTime: new Date(Date.now() - Math.random() * 3600000).toISOString(),
  energyDispensed: Math.floor(Math.random() * 50) + 5,
  currentPower: Math.floor(Math.random() * 45) + 5,
});

export const generateMockStations = (count: number = 20): Station[] => {
  const stations: Station[] = [];
  const statuses = Object.values(StationStatus);

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const powerCapacity = [50, 100, 150, 250][Math.floor(Math.random() * 4)];
    const isInUse = status === StationStatus.IN_USE;
    const currentOutput = isInUse ? Math.floor(Math.random() * powerCapacity * 0.9) : 0;

    stations.push({
      id: `station-${i + 1}`,
      name: `Charging Station ${i + 1}`,
      location: locations[i % locations.length],
      status,
      powerCapacity,
      currentOutput,
      session: isInUse ? generateSession() : null,
      lastHeartbeat: new Date(Date.now() - Math.random() * 300000).toISOString(),
      hardwareVersion: `HW-${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}`,
      firmwareVersion: `FW-${Math.floor(Math.random() * 2) + 2}.${Math.floor(Math.random() * 20)}`,
    });
  }

  return stations;
};

export const mockStations = generateMockStations();
