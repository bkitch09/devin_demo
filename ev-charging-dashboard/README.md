# EV Charging Network Dashboard

A modern React web application for managing and monitoring electric vehicle charging stations. Built with TypeScript, Material UI, and a comprehensive testing suite.

## Features

- **Real-time Station Monitoring**: View the status of all charging stations in the network
- **Troubleshooting Interface**: Diagnose and resolve issues with individual stations
- **Network Statistics**: Comprehensive analytics on energy consumption, user activity, and station performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between light and dark modes
- **Mock API**: Development environment with realistic mock data using MSW

## Technology Stack

- **React 19** with TypeScript
- **Vite** for fast development and optimized builds
- **Material UI** for component library and theming
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Recharts** for data visualization
- **Mock Service Worker (MSW)** for API mocking
- **Vitest** with React Testing Library for unit tests
- **Playwright** for end-to-end testing
- **ESLint** and **Prettier** for code quality

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd ev-charging-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Fix auto-fixable ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing
- `npm test` - Run unit tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run Playwright tests in UI mode

## Project Structure

```
ev-charging-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── common/         # Reusable components (LoadingSpinner, ErrorAlert)
│   │   ├── layout/         # Layout components (Header, Navigation, MainLayout)
│   │   ├── stations/       # Station-related components
│   │   ├── troubleshooting/# Troubleshooting components
│   │   └── statistics/     # Statistics and chart components
│   ├── pages/              # Page components (Dashboard, StationStatus, etc.)
│   ├── services/           # API service layer
│   ├── mocks/              # Mock data and MSW handlers
│   │   ├── data/          # Mock data generators
│   │   └── handlers/      # API mock handlers
│   ├── types/              # TypeScript type definitions
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React contexts (ThemeContext)
│   ├── theme/              # MUI theme configuration
│   ├── utils/              # Utility functions
│   └── test/               # Test setup files
├── tests/
│   └── e2e/               # Playwright E2E tests
├── public/                # Static assets and MSW service worker
└── README.md
```

## Application Pages

### Dashboard
Overview of network operations with key metrics:
- Total energy dispensed
- Active users
- Active charging stations
- Current power consumption

### Station Status
Comprehensive view of all charging stations:
- Real-time status indicators (Available, In Use, Offline, Error, Maintenance)
- Search and filter functionality
- Station details including location, power capacity, and active sessions

### Troubleshooting
Diagnostic tools for station maintenance:
- Health metrics (temperature, voltage, current, connectivity)
- Error code listing with severity indicators
- Event logs
- Troubleshooting actions (restart, reset errors, run diagnostics, etc.)

### Statistics
Detailed network analytics:
- Energy consumption trends over time
- User activity patterns
- Completed and in-progress sessions
- Station uptime metrics

## Mock API

The application uses Mock Service Worker (MSW) to simulate a backend API during development. The mock API provides:

- 20 simulated charging stations with various statuses
- Realistic diagnostic data with health metrics and error codes
- Network statistics with time-series data
- Action execution simulation with success/failure responses

Mock data is automatically generated and refreshes on page reload.

## Testing

### Unit Tests

Unit tests are written using Vitest and React Testing Library. Run tests with:

```bash
npm test
```

Tests cover:
- Component rendering and user interactions
- Utility functions
- Custom hooks

### E2E Tests

End-to-end tests are written using Playwright. Run tests with:

```bash
npm run test:e2e
```

E2E tests verify:
- Page navigation
- User workflows (viewing stations, executing troubleshooting actions)
- Data loading and display

## Integrating with a Real Backend

To connect this frontend to a real backend API:

1. Remove or disable MSW initialization in `src/main.tsx`
2. Update the `baseURL` in `src/services/api.ts` to point to your backend
3. Ensure your backend implements the following endpoints:

### Required API Endpoints

#### Station Management
- `GET /api/stations` - Get all stations
- `GET /api/stations/:id` - Get station by ID

#### Troubleshooting
- `GET /api/stations/:id/diagnostics` - Get diagnostic data
- `POST /api/stations/:id/actions` - Execute troubleshooting action

#### Statistics
- `GET /api/statistics/summary?period=<day|week|month>` - Get summary statistics
- `GET /api/statistics/network?period=<day|week|month>` - Get detailed network statistics

See `src/types/` for detailed TypeScript interfaces for all data models.

## Code Quality

### ESLint Configuration

The project uses ESLint with:
- TypeScript support
- React and React Hooks rules
- Prettier integration
- Custom rules for unused variables

### Prettier Configuration

Consistent code formatting with:
- Single quotes
- 2-space indentation
- Semicolons
- 100 character line width

## License

MIT
