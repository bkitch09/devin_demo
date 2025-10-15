export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface ErrorCode {
  code: string;
  description: string;
  severity: ErrorSeverity;
  timestamp: string;
}

export interface HealthMetrics {
  temperature: number;
  voltage: number;
  current: number;
  connectivityStatus: 'connected' | 'disconnected' | 'poor';
  uptime: number;
}

export interface Event {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'action';
  message: string;
  details?: Record<string, unknown>;
}

export interface DiagnosticData {
  stationId: string;
  errorCodes: ErrorCode[];
  healthMetrics: HealthMetrics;
  recentEvents: Event[];
  lastDiagnosticRun: string;
}

export enum TroubleshootingAction {
  RESTART = 'restart',
  RESET_ERRORS = 'reset_errors',
  RUN_DIAGNOSTIC = 'run_diagnostic',
  UPDATE_CONFIG = 'update_config',
  RESET_CONNECTION = 'reset_connection',
}

export interface ActionRequest {
  stationId: string;
  action: TroubleshootingAction;
  parameters?: Record<string, unknown>;
}

export interface ActionResult {
  success: boolean;
  message: string;
  timestamp: string;
  details?: Record<string, unknown>;
}
