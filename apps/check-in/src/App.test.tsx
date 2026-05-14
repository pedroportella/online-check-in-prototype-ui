import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import type { CheckInDashboard } from '@va/services-check-in';

const dashboard: CheckInDashboard = {
  generatedAt: '2026-05-13T04:30:00.000Z',
  header: {
    title: 'Virgin Australia Online Check-in',
    items: []
  },
  pageHeader: {
    title: 'Online check-in delivery cockpit',
    description: 'Prototype dashboard.',
    primaryAction: {
      label: 'Review flights',
      href: '#journey-board'
    }
  },
  releaseOptions: [{ label: 'September go-live readiness', value: 'sept' }],
  stageLabels: {
    identity: 'Identity',
    bags: 'Bags',
    seats: 'Seats',
    docs: 'Travel docs',
    boardingPass: 'Boarding pass'
  },
  stageSummaries: {
    identity: 'Green',
    bags: 'Green',
    seats: 'Green',
    docs: '92.8%',
    boardingPass: '99.1%'
  },
  workstreamLabels: {
    vendor: 'Vendor QA',
    offshore: 'Offshore build',
    security: 'Security gates',
    release: 'Release readiness'
  },
  defaultReleaseFocus: 'sept',
  defaultWorkstream: 'vendor',
  defaultActiveStages: ['identity', 'bags', 'docs', 'boardingPass'],
  controlsTitle: 'Delivery controls',
  releaseFocusLabel: 'Focus',
  releaseFocusHint: 'Switch the operating view.',
  workstreamLegend: 'Lead workstream',
  journeyStagesLegend: 'Journey stages',
  leadNoteTitle: 'Lead note',
  leadNote: 'Route high-risk items through accessibility, security and release gates.',
  kpiCards: [
    { label: 'Check-in completion', value: '87.4%' },
    { label: 'Vendor defects open', value: '23' },
    { label: 'AI review coverage', value: '64 PRs' },
    { label: 'Passenger exceptions', value: '26' }
  ],
  kpis: {
    checkInCompletionPercent: 87.4,
    openVendorDefects: 23,
    aiReviewCoveragePullRequests: 64,
    passengerExceptions: 26
  },
  flights: [
    {
      id: 'VA938',
      route: 'BNE to SYD',
      departure: '08:05',
      status: 'Ready',
      checkedIn: 142,
      exceptions: 7,
      stages: { identity: 'green', bags: 'green', seats: 'green', docs: 'amber', boardingPass: 'green' }
    }
  ],
  telemetry: {
    generatedAt: '2026-05-13T04:30:00.000Z',
    engines: [
      {
        engineId: 'simulator-engine-1',
        sequence: 1,
        emittedAt: '2026-05-13T04:30:00.000Z',
        intervalMs: 60000,
        flightCount: 1
      }
    ],
    flights: []
  }
};

describe('App', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders the check-in delivery cockpit from the service package', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(dashboard), {
        headers: { 'Content-Type': 'application/json' }
      })
    );

    render(<App />);
    expect(await screen.findByRole('heading', { name: 'Online check-in delivery cockpit' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Online check-in journey board' })).toBeTruthy();
    expect(screen.getByText('AI review coverage')).toBeTruthy();
    expect(screen.getByText('simulator-engine-1')).toBeTruthy();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:7003/api/v1/check-in/dashboard',
      expect.any(Object)
    );
  });
});
