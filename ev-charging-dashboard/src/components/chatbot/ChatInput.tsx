import React, { useState, KeyboardEvent } from 'react';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  isLoading = false,
  placeholder = 'Type your message...',
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled && !isLoading) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'flex-end',
        p: 2,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={disabled || isLoading || !message.trim()}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          '&.Mui-disabled': {
            bgcolor: 'action.disabledBackground',
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : <Send />}
      </IconButton>
    </Box>
  );
};
