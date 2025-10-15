import {
  DiagnosticData,
  ErrorCode,
  ErrorSeverity,
  Event,
  HealthMetrics,
} from '../../types/troubleshooting';

const errorDescriptions = [
  { code: 'E001', description: 'Communication timeout', severity: ErrorSeverity.MEDIUM },
  { code: 'E002', description: 'Voltage fluctuation detected', severity: ErrorSeverity.HIGH },
  { code: 'E003', description: 'Temperature threshold exceeded', severity: ErrorSeverity.CRITICAL },
  { code: 'E004', description: 'Ground fault detected', severity: ErrorSeverity.CRITICAL },
  { code: 'E005', description: 'RFID reader malfunction', severity: ErrorSeverity.LOW },
  { code: 'E006', description: 'Payment system offline', severity: ErrorSeverity.MEDIUM },
  { code: 'W001', description: 'Scheduled maintenance due', severity: ErrorSeverity.LOW },
  { code: 'W002', description: 'Cable wear detected', severity: ErrorSeverity.MEDIUM },
];

const eventMessages = [
  'Station started successfully',
  'Charging session initiated',
  'Charging session completed',
  'Configuration updated',
  'Diagnostic test passed',
  'Error cleared by operator',
  'Connection restored',
  'Firmware update initiated',
];

const generateHealthMetrics = (): HealthMetrics => ({
  temperature: Math.floor(Math.random() * 30) + 20,
  voltage: Math.floor(Math.random() * 20) + 220,
  current: Math.floor(Math.random() * 100) + 10,
  connectivityStatus: ['connected', 'poor', 'disconnected'][
    Math.floor(Math.random() * 3)
  ] as HealthMetrics['connectivityStatus'],
  uptime: Math.floor(Math.random() * 10000000),
});

const generateErrorCodes = (): ErrorCode[] => {
  const errorCount = Math.floor(Math.random() * 4);
  const errors: ErrorCode[] = [];

  for (let i = 0; i < errorCount; i++) {
    const errorTemplate = errorDescriptions[Math.floor(Math.random() * errorDescriptions.length)];
    errors.push({
      ...errorTemplate,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    });
  }

  return errors;
};

const generateEvents = (count: number = 10): Event[] => {
  const events: Event[] = [];
  const types: Event['type'][] = ['info', 'warning', 'error', 'action'];

  for (let i = 0; i < count; i++) {
    events.push({
      id: `event-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 604800000).toISOString(),
      type: types[Math.floor(Math.random() * types.length)],
      message: eventMessages[Math.floor(Math.random() * eventMessages.length)],
    });
  }

  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const generateDiagnosticData = (stationId: string): DiagnosticData => ({
  stationId,
  errorCodes: generateErrorCodes(),
  healthMetrics: generateHealthMetrics(),
  recentEvents: generateEvents(),
  lastDiagnosticRun: new Date(Date.now() - Math.random() * 3600000).toISOString(),
});
