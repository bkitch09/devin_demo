import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, LinearProgress } from '@mui/material';
import { PlayArrow, CheckCircle } from '@mui/icons-material';
import { SuggestedAction } from '../../types/chatbot';

interface SuggestedActionCardProps {
  action: SuggestedAction;
  onExecute?: (actionId: string) => void;
  isExecuting?: boolean;
}

export const SuggestedActionCard: React.FC<SuggestedActionCardProps> = ({
  action,
  onExecute,
  isExecuting = false,
}) => {
  const confidenceColor =
    action.confidence >= 0.8 ? 'success' : action.confidence >= 0.6 ? 'warning' : 'default';

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: confidenceColor === 'success' ? 'success.main' : 'divider',
        borderWidth: confidenceColor === 'success' ? 2 : 1,
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            {action.label}
          </Typography>
          <Chip
            icon={<CheckCircle />}
            label={`${Math.round(action.confidence * 100)}%`}
            size="small"
            color={confidenceColor}
            sx={{ ml: 1 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {action.description}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          <strong>Reasoning:</strong> {action.reasoning}
        </Typography>

        {action.prerequisites && action.prerequisites.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Prerequisites:</strong>
            </Typography>
            {action.prerequisites.map((prereq, index) => (
              <Typography
                key={index}
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', ml: 1 }}
              >
                • {prereq}
              </Typography>
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          size="small"
          startIcon={<PlayArrow />}
          onClick={() => onExecute?.(action.id)}
          disabled={isExecuting}
          fullWidth
          sx={{ mt: 1 }}
        >
          {isExecuting ? 'Executing...' : 'Execute Action'}
        </Button>

        {isExecuting && <LinearProgress sx={{ mt: 1 }} />}
      </CardContent>
    </Card>
  );
};
