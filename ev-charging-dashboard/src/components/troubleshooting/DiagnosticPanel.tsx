import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Error, Warning, CheckCircle, SignalCellularAlt } from '@mui/icons-material';
import { DiagnosticData, ErrorSeverity } from '../../types/troubleshooting';
import { formatDate, formatUptime } from '../../utils/formatters';

interface DiagnosticPanelProps {
  diagnostics: DiagnosticData;
}

const severityConfig = {
  [ErrorSeverity.LOW]: { icon: <CheckCircle />, color: 'success' as const },
  [ErrorSeverity.MEDIUM]: { icon: <Warning />, color: 'warning' as const },
  [ErrorSeverity.HIGH]: { icon: <Warning />, color: 'error' as const },
  [ErrorSeverity.CRITICAL]: { icon: <Error />, color: 'error' as const },
};

export const DiagnosticPanel: React.FC<DiagnosticPanelProps> = ({ diagnostics }) => {
  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Health Metrics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                Temperature
              </Typography>
              <Typography variant="h6">{diagnostics.healthMetrics.temperature}°C</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                Voltage
              </Typography>
              <Typography variant="h6">{diagnostics.healthMetrics.voltage}V</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                Current
              </Typography>
              <Typography variant="h6">{diagnostics.healthMetrics.current}A</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">
                Uptime
              </Typography>
              <Typography variant="h6">{formatUptime(diagnostics.healthMetrics.uptime)}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <SignalCellularAlt sx={{ mr: 1 }} />
            <Typography variant="body2">
              Connectivity: {diagnostics.healthMetrics.connectivityStatus}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Error Codes
          </Typography>
          {diagnostics.errorCodes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No active errors
            </Typography>
          ) : (
            <List>
              {diagnostics.errorCodes.map((error, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" fontWeight="bold">
                            {error.code}
                          </Typography>
                          <Chip
                            icon={severityConfig[error.severity].icon}
                            label={error.severity}
                            color={severityConfig[error.severity].color}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {error.description}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption" color="text.secondary">
                            {formatDate(error.timestamp)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Events
          </Typography>
          <List>
            {diagnostics.recentEvents.slice(0, 10).map((event, index) => (
              <React.Fragment key={event.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemText
                    primary={event.message}
                    secondary={
                      <>
                        <Chip label={event.type} size="small" sx={{ mr: 1 }} />
                        {formatDate(event.timestamp)}
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
