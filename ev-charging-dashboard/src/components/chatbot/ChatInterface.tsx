import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage as ChatMessageType, MessageRole } from '../../types/chatbot';
import { Station } from '../../types/station';
import { DiagnosticData, TroubleshootingAction } from '../../types/troubleshooting';

interface ChatInterfaceProps {
  open: boolean;
  onClose: () => void;
  station?: Station;
  diagnostics?: DiagnosticData;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  open,
  onClose,
  station,
  diagnostics,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [executingActionId, setExecutingActionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      const welcomeMessage: ChatMessageType = {
        id: 'welcome',
        role: MessageRole.ASSISTANT,
        content: station
          ? `Hello! I'm your AI troubleshooting assistant for ${station.name}. I can help you diagnose issues, interpret error codes, and recommend actions to resolve problems. What would you like help with today?`
          : "Hello! I'm your AI troubleshooting assistant. Please select a station to begin troubleshooting.",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [open, station, messages.length]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: MessageRole.USER,
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: MessageRole.ASSISTANT,
        content:
          'I understand your concern. Let me analyze the station diagnostics and provide recommendations.',
        timestamp: new Date().toISOString(),
        metadata: {
          suggestedActions: diagnostics?.errorCodes.length
            ? [
                {
                  id: 'action-1',
                  action: TroubleshootingAction.RESTART,
                  label: 'Restart Station',
                  description: 'Restart the charging station to clear temporary errors',
                  confidence: 0.85,
                  reasoning: 'Based on the current error codes, a restart may resolve the issues',
                  prerequisites: ['Ensure no active charging session'],
                },
              ]
            : [],
        },
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleExecuteAction = async (actionId: string) => {
    setExecutingActionId(actionId);

    setTimeout(() => {
      const resultMessage: ChatMessageType = {
        id: `result-${Date.now()}`,
        role: MessageRole.ASSISTANT,
        content: 'Action executed successfully.',
        timestamp: new Date().toISOString(),
        metadata: {
          actionResult: {
            success: true,
            message: 'The troubleshooting action has been executed. Monitoring station status...',
          },
        },
      };
      setMessages(prev => [...prev, resultMessage]);
      setExecutingActionId(null);
    }, 2000);
  };

  const drawerWidth = isMobile ? '100%' : 450;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          maxWidth: '100vw',
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        <ChatHeader station={station} onClose={onClose} />

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            bgcolor: 'background.paper',
          }}
        >
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message}
              onExecuteAction={handleExecuteAction}
              isExecutingAction={executingActionId !== null}
            />
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={!station}
          isLoading={isLoading}
          placeholder={
            station
              ? 'Ask about diagnostics, errors, or request troubleshooting help...'
              : 'Please select a station first'
          }
        />
      </Paper>
    </Drawer>
  );
};
