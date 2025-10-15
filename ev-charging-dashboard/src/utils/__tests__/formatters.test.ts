import { describe, it, expect } from 'vitest';
import { formatEnergy, formatPower, formatUptime } from '../formatters';

describe('formatters', () => {
  describe('formatEnergy', () => {
    it('formats energy values', () => {
      expect(formatEnergy(45.5)).toBe('45.50 kWh');
      expect(formatEnergy(100)).toBe('100.00 kWh');
    });
  });

  describe('formatPower', () => {
    it('formats power values', () => {
      expect(formatPower(50.5)).toBe('50.5 kW');
      expect(formatPower(100)).toBe('100.0 kW');
    });
  });

  describe('formatUptime', () => {
    it('formats uptime in days and hours', () => {
      expect(formatUptime(90000)).toBe('1d 1h');
    });

    it('formats uptime in hours and minutes', () => {
      expect(formatUptime(3700)).toBe('1h 1m');
    });

    it('formats uptime in minutes', () => {
      expect(formatUptime(120)).toBe('2m');
    });
  });
});
