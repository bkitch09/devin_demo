import { TroubleshootingAction } from './troubleshooting';
import { Station, StationStatus } from './station';
import { DiagnosticData } from './troubleshooting';

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  metadata?: {
    suggestedActions?: SuggestedAction[];
    diagnosticSummary?: string;
    actionResult?: {
      success: boolean;
      message: string;
    };
  };
}

export interface SuggestedAction {
  id: string;
  action: TroubleshootingAction;
  label: string;
  description: string;
  confidence: number;
  reasoning: string;
  prerequisites?: string[];
}

export interface ChatContext {
  station?: Station;
  diagnostics?: DiagnosticData;
  availableActions: TroubleshootingAction[];
  stationStatus?: StationStatus;
}

export interface ChatSession {
  sessionId: string;
  stationId: string;
  messages: ChatMessage[];
  context: ChatContext;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface SendMessageRequest {
  sessionId: string;
  message: string;
  context: ChatContext;
}

export interface SendMessageResponse {
  message: ChatMessage;
  session: ChatSession;
}

export interface CreateSessionRequest {
  stationId: string;
  initialContext: ChatContext;
}

export interface CreateSessionResponse {
  session: ChatSession;
}
