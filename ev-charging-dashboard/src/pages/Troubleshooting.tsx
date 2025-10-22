import React, { useState } from 'react';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Fab,
  Tooltip,
} from '@mui/material';
import { Chat } from '@mui/icons-material';
import { useStations } from '../hooks/useStations';
import { useDiagnostics, useTroubleshootingAction } from '../hooks/useTroubleshooting';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { DiagnosticPanel } from '../components/troubleshooting/DiagnosticPanel';
import { ActionPanel } from '../components/troubleshooting/ActionPanel';
import { ChatInterface } from '../components/chatbot/ChatInterface';
import { TroubleshootingAction } from '../types/troubleshooting';

export const Troubleshooting: React.FC = () => {
  const [selectedStationId, setSelectedStationId] = useState<string>('');
  const [chatOpen, setChatOpen] = useState(false);
  const { data: stations, isLoading: stationsLoading } = useStations();
  const { data: diagnostics, isLoading: diagnosticsLoading } = useDiagnostics(selectedStationId);
  const { mutate: executeAction, isPending, data: actionResult } = useTroubleshootingAction();

  const handleStationChange = (event: SelectChangeEvent) => {
    setSelectedStationId(event.target.value);
  };

  const handleExecuteAction = (action: TroubleshootingAction) => {
    if (selectedStationId) {
      executeAction({ stationId: selectedStationId, action });
    }
  };

  if (stationsLoading) {
    return <LoadingSpinner />;
  }

  const selectedStation = stations?.find(s => s.id === selectedStationId);

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        Station Troubleshooting
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Diagnose and resolve issues with charging stations
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Station</InputLabel>
        <Select value={selectedStationId} label="Select Station" onChange={handleStationChange}>
          <MenuItem value="">
            <em>Choose a station</em>
          </MenuItem>
          {stations?.map(station => (
            <MenuItem key={station.id} value={station.id}>
              {station.name} - {station.location.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedStationId && diagnosticsLoading && <LoadingSpinner />}

      {selectedStationId && !diagnosticsLoading && !diagnostics && (
        <ErrorAlert message="Failed to load diagnostic data" />
      )}

      {selectedStationId && diagnostics && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <DiagnosticPanel diagnostics={diagnostics} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ActionPanel
              stationId={selectedStationId}
              onExecuteAction={handleExecuteAction}
              isExecuting={isPending}
              lastResult={actionResult}
            />
          </Grid>
        </Grid>
      )}

      {selectedStationId && (
        <Tooltip title="Open AI Troubleshooting Assistant" placement="left">
          <Fab
            color="primary"
            aria-label="chat"
            onClick={() => setChatOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Chat />
          </Fab>
        </Tooltip>
      )}

      <ChatInterface
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        station={selectedStation}
        diagnostics={diagnostics}
      />
    </Box>
  );
};
