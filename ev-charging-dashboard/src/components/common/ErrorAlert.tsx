import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorAlertProps {
  message?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message || 'An error occurred while loading data. Please try again.'}
    </Alert>
  );
};
