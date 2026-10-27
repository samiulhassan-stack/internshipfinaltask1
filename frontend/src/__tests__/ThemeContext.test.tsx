import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  it('provides theme context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toBeInTheDocument();
    expect(['light', 'dark']).toContain(themeElement.textContent);
  });

  it('toggles theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    const themeElement = screen.getByTestId('theme');
    const initialTheme = themeElement.textContent;
    
    const toggleButton = screen.getByText('Toggle');
    fireEvent.click(toggleButton);
    
    expect(themeElement.textContent).not.toBe(initialTheme);
  });
});
