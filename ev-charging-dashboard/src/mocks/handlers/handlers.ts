import { http, HttpResponse } from 'msw';
import { mockStations } from '../data/stationData';
import { generateDiagnosticData } from '../data/troubleshootingData';
import { generateNetworkStatistics } from '../data/statisticsData';
import { ActionResult, TroubleshootingAction } from '../../types/troubleshooting';
import { CreateStationRequest, Station, StationStatus } from '../../types/station';

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

  http.post(`${BASE_URL}/stations`, async ({ request }) => {
    const body = (await request.json()) as CreateStationRequest;

    const newStation: Station = {
      id: `station-${mockStations.length + 1}`,
      name: body.name,
      location: body.location,
      status: StationStatus.MAINTENANCE,
      powerCapacity: body.powerCapacity,
      currentOutput: 0,
      session: null,
      lastHeartbeat: new Date().toISOString(),
      hardwareVersion: body.hardwareVersion,
      firmwareVersion: body.firmwareVersion,
    };

    mockStations.push(newStation);

    return HttpResponse.json(newStation, { status: 201 });
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
];
