import { http, HttpResponse } from 'msw';
import { mockStations } from '../data/stationData';
import { generateDiagnosticData } from '../data/troubleshootingData';
import { generateNetworkStatistics } from '../data/statisticsData';
import { ActionResult, TroubleshootingAction } from '../../types/troubleshooting';
import { Driver, DriverFormData } from '../../types/driver';
import {
  mockDrivers,
  addMockDriver,
  updateMockDriver,
  deleteMockDriver,
} from '../data/driverData';

const BASE_URL = '/api';

export const handlers = [
  http.get(`${BASE_URL}/stations`, () => {
    return HttpResponse.json(mockStations);
  }),

  http.get(`${BASE_URL}/stations/:id`, ({ params }) => {
    const { id } = params;
    const station = mockStations.find(s => s.id === id);

    if (!station) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(station);
  }),

  http.get(`${BASE_URL}/stations/:id/diagnostics`, ({ params }) => {
    const { id } = params;
    const station = mockStations.find(s => s.id === id);

    if (!station) {
      return new HttpResponse(null, { status: 404 });
    }

    const diagnostics = generateDiagnosticData(id as string);
    return HttpResponse.json(diagnostics);
  }),

  http.post(`${BASE_URL}/stations/:id/actions`, async ({ params, request }) => {
    const { id } = params;
    const station = mockStations.find(s => s.id === id);

    if (!station) {
      return new HttpResponse(null, { status: 404 });
    }

    const body = (await request.json()) as { action: TroubleshootingAction };
    const { action } = body;

    const actionMessages: Record<TroubleshootingAction, string> = {
      [TroubleshootingAction.RESTART]: `Station ${id} restarted successfully`,
      [TroubleshootingAction.RESET_ERRORS]: `Error codes cleared for station ${id}`,
      [TroubleshootingAction.RUN_DIAGNOSTIC]: `Diagnostic test completed for station ${id}`,
      [TroubleshootingAction.UPDATE_CONFIG]: `Configuration updated for station ${id}`,
      [TroubleshootingAction.RESET_CONNECTION]: `Connection reset for station ${id}`,
    };

    const result: ActionResult = {
      success: Math.random() > 0.1,
      message: actionMessages[action] || 'Action completed',
      timestamp: new Date().toISOString(),
    };

    return HttpResponse.json(result);
  }),

  http.get(`${BASE_URL}/statistics/summary`, ({ request }) => {
    const url = new URL(request.url);
    const period = (url.searchParams.get('period') as 'day' | 'week' | 'month') || 'week';
    const stats = generateNetworkStatistics(period);
    return HttpResponse.json(stats.summary);
  }),

  http.get(`${BASE_URL}/statistics/network`, ({ request }) => {
    const url = new URL(request.url);
    const period = (url.searchParams.get('period') as 'day' | 'week' | 'month') || 'week';
    const stats = generateNetworkStatistics(period);
    return HttpResponse.json(stats);
  }),

  // Driver endpoints
  http.get(`${BASE_URL}/drivers`, () => {
    return HttpResponse.json(mockDrivers);
  }),

  http.get(`${BASE_URL}/drivers/:id`, ({ params }) => {
    const { id } = params;
    const driver = mockDrivers.find(d => d.id === id);

    if (!driver) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(driver);
  }),

  http.post(`${BASE_URL}/drivers`, async ({ request }) => {
    const body = (await request.json()) as DriverFormData;

    const generateUUID = (): string => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };

    const newDriver: Driver = {
      id: generateUUID(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addMockDriver(newDriver);
    return HttpResponse.json(newDriver, { status: 201 });
  }),

  http.put(`${BASE_URL}/drivers/:id`, async ({ params, request }) => {
    const { id } = params;
    const driver = mockDrivers.find(d => d.id === id);

    if (!driver) {
      return new HttpResponse(null, { status: 404 });
    }

    const body = (await request.json()) as Partial<DriverFormData>;
    updateMockDriver(id as string, body);

    const updatedDriver = mockDrivers.find(d => d.id === id);
    return HttpResponse.json(updatedDriver);
  }),

  http.delete(`${BASE_URL}/drivers/:id`, ({ params }) => {
    const { id } = params;
    const driver = mockDrivers.find(d => d.id === id);

    if (!driver) {
      return new HttpResponse(null, { status: 404 });
    }

    deleteMockDriver(id as string);
    return new HttpResponse(null, { status: 204 });
  }),
];
