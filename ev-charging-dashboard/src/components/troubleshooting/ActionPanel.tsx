import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from '@mui/material';
import { Refresh, Clear, BugReport, Settings, Wifi } from '@mui/icons-material';
import { TroubleshootingAction } from '../../types/troubleshooting';

interface ActionPanelProps {
  stationId: string;
  onExecuteAction: (action: TroubleshootingAction) => void;
  isExecuting: boolean;
  lastResult?: { success: boolean; message: string } | null;
}

const actionConfig = {
  [TroubleshootingAction.RESTART]: {
    label: 'Restart Station',
    icon: <Refresh />,
    description: 'Restart the charging station',
    confirmMessage:
      'Are you sure you want to restart this station? This will interrupt any active charging session.',
  },
  [TroubleshootingAction.RESET_ERRORS]: {
    label: 'Reset Errors',
    icon: <Clear />,
    description: 'Clear all error codes',
    confirmMessage: 'This will clear all error codes. Continue?',
  },
  [TroubleshootingAction.RUN_DIAGNOSTIC]: {
    label: 'Run Diagnostic',
    icon: <BugReport />,
    description: 'Run full diagnostic test',
    confirmMessage: 'Run a full diagnostic test on this station?',
  },
  [TroubleshootingAction.UPDATE_CONFIG]: {
    label: 'Update Config',
    icon: <Settings />,
    description: 'Update station configuration',
    confirmMessage: 'Update the station configuration to the latest version?',
  },
  [TroubleshootingAction.RESET_CONNECTION]: {
    label: 'Reset Connection',
    icon: <Wifi />,
    description: 'Reset network connection',
    confirmMessage: 'Reset the network connection for this station?',
  },
};

export const ActionPanel: React.FC<ActionPanelProps> = ({
  stationId: _stationId,
  onExecuteAction,
  isExecuting,
  lastResult,
}) => {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: TroubleshootingAction | null;
  }>({ open: false, action: null });

  const handleActionClick = (action: TroubleshootingAction) => {
    setConfirmDialog({ open: true, action });
  };

  const handleConfirm = () => {
    if (confirmDialog.action) {
      onExecuteAction(confirmDialog.action);
    }
    setConfirmDialog({ open: false, action: null });
  };

  const handleCancel = () => {
    setConfirmDialog({ open: false, action: null });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Troubleshooting Actions
        </Typography>

        {lastResult && (
          <Alert severity={lastResult.success ? 'success' : 'error'} sx={{ mb: 2 }}>
            {lastResult.message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(actionConfig).map(([action, config]) => (
            <Box key={action} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={config.icon}
                onClick={() => handleActionClick(action as TroubleshootingAction)}
                disabled={isExecuting}
                sx={{ minWidth: 200 }}
              >
                {config.label}
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                {config.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>

      <Dialog open={confirmDialog.open} onClose={handleCancel}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.action && actionConfig[confirmDialog.action].confirmMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
