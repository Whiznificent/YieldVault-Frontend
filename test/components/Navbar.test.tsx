import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Navbar from '../../src/components/Navbar';

describe('Navbar', () => {
  const STORAGE_KEY = 'yieldvault:nav-collapsed';

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  it('renders navigation links and brand', () => {
    render(<Navbar />);
    expect(screen.getByText('YieldVault')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Positions')).toBeInTheDocument();
    expect(screen.getByText('Wizard')).toBeInTheDocument();
  });

  it('renders navigation toggle button', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /collapse navigation/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles navigation collapse state on button click', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /collapse navigation/i });
    const navLinks = screen.getByRole('navigation').querySelector('.nav-links');

    // Initially expanded
    expect(navLinks).not.toHaveClass('nav-links-collapsed');

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(navLinks).toHaveClass('nav-links-collapsed');

    // Click to expand
    fireEvent.click(toggleButton);
    expect(navLinks).not.toHaveClass('nav-links-collapsed');
  });

  it('persists collapse state to localStorage', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /collapse navigation/i });

    // Collapse the navigation
    fireEvent.click(toggleButton);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('true');

    // Expand the navigation
    fireEvent.click(toggleButton);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('false');
  });

  it('loads initial state from localStorage', () => {
    // Set collapsed state in localStorage before rendering
    localStorage.setItem(STORAGE_KEY, 'true');
    render(<Navbar />);
    const navLinks = screen.getByRole('navigation').querySelector('.nav-links');
    expect(navLinks).toHaveClass('nav-links-collapsed');
  });

  it('defaults to expanded state when localStorage is empty', () => {
    render(<Navbar />);
    const navLinks = screen.getByRole('navigation').querySelector('.nav-links');
    expect(navLinks).not.toHaveClass('nav-links-collapsed');
  });

  it('updates aria-expanded attribute on toggle', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /collapse navigation/i });

    // Initially expanded
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('updates aria-label on toggle', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /collapse navigation/i });

    // Initially shows "Collapse navigation"
    expect(toggleButton).toHaveAttribute('aria-label', 'Collapse navigation');

    // Click to collapse - should show "Expand navigation"
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-label', 'Expand navigation');
  });

  it('handles localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => {
      throw new Error('Storage unavailable');
    };

    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /collapse navigation/i });

    // Should not throw error when toggling
    expect(() => fireEvent.click(toggleButton)).not.toThrow();

    // Restore original localStorage.setItem
    localStorage.setItem = originalSetItem;
  });
});
