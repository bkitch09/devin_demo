import { Driver } from '../../types/driver';

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
];

const vehicleMakes = ['Tesla', 'Rivian', 'Ford', 'Chevrolet', 'BMW', 'Audi', 'Porsche', 'Hyundai', 'Kia', 'Volkswagen'];

const vehicleModels: Record<string, string[]> = {
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
  Rivian: ['R1T', 'R1S'],
  Ford: ['Mustang Mach-E', 'F-150 Lightning'],
  Chevrolet: ['Bolt EV', 'Bolt EUV', 'Equinox EV', 'Silverado EV'],
  BMW: ['i4', 'iX', 'i7', 'i5'],
  Audi: ['e-tron', 'e-tron GT', 'Q4 e-tron', 'Q8 e-tron'],
  Porsche: ['Taycan', 'Taycan Cross Turismo'],
  Hyundai: ['Ioniq 5', 'Ioniq 6', 'Kona Electric'],
  Kia: ['EV6', 'EV9', 'Niro EV'],
  Volkswagen: ['ID.4', 'ID.Buzz'],
};

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const generateStationAccess = (stationCount: number = 20): string[] => {
  const accessCount = Math.floor(Math.random() * 8) + 1;
  const stationIds: string[] = [];
  const usedIds = new Set<number>();

  while (stationIds.length < accessCount) {
    const stationNum = Math.floor(Math.random() * stationCount) + 1;
    if (!usedIds.has(stationNum)) {
      usedIds.add(stationNum);
      stationIds.push(`station-${stationNum}`);
    }
  }

  return stationIds.sort((a, b) => {
    const numA = parseInt(a.split('-')[1]);
    const numB = parseInt(b.split('-')[1]);
    return numA - numB;
  });
};

export const generateMockDrivers = (count: number = 15): Driver[] => {
  const drivers: Driver[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const vehicleMake = vehicleMakes[Math.floor(Math.random() * vehicleMakes.length)];
    const models = vehicleModels[vehicleMake];
    const vehicleModel = models[Math.floor(Math.random() * models.length)];

    const createdAt = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
    const updatedAt = new Date(
      new Date(createdAt).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    drivers.push({
      id: generateUUID(),
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      vehicleMake,
      vehicleModel,
      stationAccess: generateStationAccess(),
      createdAt,
      updatedAt,
    });
  }

  return drivers;
};

export let mockDrivers = generateMockDrivers();

export const resetMockDrivers = () => {
  mockDrivers = generateMockDrivers();
};

export const addMockDriver = (driver: Driver) => {
  mockDrivers = [...mockDrivers, driver];
};

export const updateMockDriver = (id: string, updates: Partial<Driver>) => {
  mockDrivers = mockDrivers.map(driver =>
    driver.id === id ? { ...driver, ...updates, updatedAt: new Date().toISOString() } : driver
  );
};

export const deleteMockDriver = (id: string) => {
  mockDrivers = mockDrivers.filter(driver => driver.id !== id);
};
