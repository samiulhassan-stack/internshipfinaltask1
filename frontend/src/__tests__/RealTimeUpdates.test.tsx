import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { SocketProvider, useSocket } from '../context/SocketContext';

function TestComponent() {
  const { socket, connected } = useSocket();
  return (
    <div>
      <div data-testid="connected">{connected ? 'true' : 'false'}</div>
      <div data-testid="socket">{socket ? 'exists' : 'null'}</div>
    </div>
  );
}

const MockedSocketTest = () => (
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <TestComponent />
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('Real-time Socket Connection', () => {
  it('initializes socket context', () => {
    const { getByTestId } = render(<MockedSocketTest />);
    
    const connectedElement = getByTestId('connected');
    const socketElement = getByTestId('socket');
    
    expect(connectedElement).toBeInTheDocument();
    expect(socketElement).toBeInTheDocument();
  });

  it('socket starts as disconnected', () => {
    const { getByTestId } = render(<MockedSocketTest />);
    
    const connectedElement = getByTestId('connected');
    expect(connectedElement.textContent).toBe('false');
  });
});
