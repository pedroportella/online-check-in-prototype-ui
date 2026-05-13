import { withCheckInApi } from '../env';
import type { CheckInDashboard } from '../types';
import { ApiError } from './errors';

export const getCheckInDashboard = async (opts: { timeoutMs?: number } = {}): Promise<CheckInDashboard> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 15000);

  try {
    const response = await fetch(withCheckInApi('/api/v1/check-in/dashboard'), {
      headers: {
        Accept: 'application/json'
      },
      signal: controller.signal
    });

    const contentType = response.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');

    if (!response.ok) {
      let details: unknown;
      try {
        details = isJson ? await response.json() : await response.text();
      } catch {
        details = undefined;
      }

      throw new ApiError(`Check-in dashboard request failed with status ${response.status}`, {
        code: 'HTTP',
        status: response.status,
        details
      });
    }

    return (await response.json()) as CheckInDashboard;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && (error as { name?: unknown }).name === 'AbortError') {
      throw new ApiError('The check-in service request timed out.', { code: 'TIMEOUT', cause: error });
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError('Cannot reach the check-in service.', { code: 'NETWORK', cause: error });
  } finally {
    clearTimeout(timeout);
  }
};
