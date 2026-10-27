import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import { AuthProvider } from '../context/AuthContext';
import * as api from '../lib/api';

vi.mock('../lib/api');

const MockedDashboard = () => (
  <BrowserRouter>
    <AuthProvider>
      <DashboardPage />
    </AuthProvider>
  </BrowserRouter>
);

describe('DashboardPage', () => {
  it('shows loading state initially', () => {
    vi.spyOn(api, 'api').mockReturnValue({
      get: vi.fn(() => new Promise(() => {})),
    } as any);

    render(<MockedDashboard />);
    
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders dashboard title', async () => {
    vi.spyOn(api, 'api').mockReturnValue({
      get: vi.fn(() => Promise.resolve({ data: { projects: [] } })),
    } as any);

    render(<MockedDashboard />);
    
    // Wait for loading to complete and check for dashboard text
    const dashboardText = await screen.findByText(/dashboard/i);
    expect(dashboardText).toBeInTheDocument();
  });
});
