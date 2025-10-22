import React from 'react';
import { Box, Paper, Typography, Avatar, Chip, Alert } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import { ChatMessage as ChatMessageType, MessageRole } from '../../types/chatbot';
import { SuggestedActionCard } from './SuggestedActionCard';
import { formatDate } from '../../utils/formatters';

interface ChatMessageProps {
  message: ChatMessageType;
  onExecuteAction?: (actionId: string) => void;
  isExecutingAction?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onExecuteAction,
  isExecutingAction = false,
}) => {
  const isUser = message.role === MessageRole.USER;
  const isSystem = message.role === MessageRole.SYSTEM;

  if (isSystem) {
    return (
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Chip
          label={message.content}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.75rem' }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
        }}
      >
        {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
      </Avatar>

      <Box sx={{ maxWidth: '70%', minWidth: '200px' }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: isUser ? 'primary.50' : 'grey.50',
            borderRadius: 2,
            ...(isUser && {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }),
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>

          {message.metadata?.actionResult && (
            <Alert
              severity={message.metadata.actionResult.success ? 'success' : 'error'}
              sx={{ mt: 1 }}
            >
              {message.metadata.actionResult.message}
            </Alert>
          )}
        </Paper>

        {message.metadata?.suggestedActions && message.metadata.suggestedActions.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {message.metadata.suggestedActions.map(action => (
              <SuggestedActionCard
                key={action.id}
                action={action}
                onExecute={onExecuteAction}
                isExecuting={isExecutingAction}
              />
            ))}
          </Box>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 0.5, textAlign: isUser ? 'right' : 'left' }}
        >
          {formatDate(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  );
};
