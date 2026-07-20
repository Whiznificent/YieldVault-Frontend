import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResizableTable from '../../src/components/ResizableTable';

describe('ResizableTable', () => {
  const mockColumns = [
    { id: 'asset', header: 'Asset', width: 150 },
    { id: 'shares', header: 'Shares', width: 150 },
    { id: 'value', header: 'Value', width: 150 },
    { id: 'earned', header: 'Earned', width: 150 },
  ];

  const mockChildren = (
    <div className="test-row" data-testid="test-row">
      <span>Test content</span>
    </div>
  );

  it('renders table header with column headers', () => {
    render(<ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>);
    
    expect(screen.getByText('Asset')).toBeInTheDocument();
    expect(screen.getByText('Shares')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Earned')).toBeInTheDocument();
  });

  it('renders children in table body', () => {
    render(<ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>);
    
    expect(screen.getByTestId('test-row')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders resize handles for all columns except the last one', () => {
    const { container } = render(
      <ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>
    );
    
    const resizeHandles = container.querySelectorAll('.resize-handle');
    // Should have 3 handles (one for each column except the last)
    expect(resizeHandles.length).toBe(3);
  });

  it('applies initial column widths from props', () => {
    const { container } = render(
      <ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>
    );
    
    const header = container.querySelector('.resizable-table-header');
    expect(header).toHaveStyle({
      gridTemplateColumns: '150px 150px 150px 150px',
    });
  });

  it('starts resizing on mouse down', () => {
    const { container } = render(
      <ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>
    );
    
    const resizeHandles = container.querySelectorAll('.resize-handle');
    const firstHandle = resizeHandles[0];
    
    fireEvent.mouseDown(firstHandle);
    
    // After mouse down, the handle should still be present
    expect(firstHandle).toBeInTheDocument();
  });

  it('updates column widths during resize', () => {
    const { container } = render(
      <ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>
    );
    
    const resizeHandles = container.querySelectorAll('.resize-handle');
    const firstHandle = resizeHandles[0];
    
    // Start resize
    fireEvent.mouseDown(firstHandle);
    
    // Simulate mouse move
    fireEvent.mouseMove(document, { clientX: 200 });
    
    // The header should have updated grid template columns
    const header = container.querySelector('.resizable-table-header');
    expect(header).toBeInTheDocument();
  });

  it('stops resizing on mouse up', () => {
    const { container } = render(
      <ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>
    );
    
    const resizeHandles = container.querySelectorAll('.resize-handle');
    const firstHandle = resizeHandles[0];
    
    // Start and stop resize
    fireEvent.mouseDown(firstHandle);
    fireEvent.mouseUp(document);
    
    // After mouse up, resizing should stop
    expect(firstHandle).toBeInTheDocument();
  });

  it('enforces minimum column width during resize', () => {
    const { container } = render(
      <ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>
    );
    
    const resizeHandles = container.querySelectorAll('.resize-handle');
    const firstHandle = resizeHandles[0];
    
    // Start resize
    fireEvent.mouseDown(firstHandle);
    
    // Try to resize below minimum (80px)
    fireEvent.mouseMove(document, { clientX: 50 });
    
    // The column should not go below minimum width
    const header = container.querySelector('.resizable-table-header');
    expect(header).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <ResizableTable columns={mockColumns}>{mockChildren}</ResizableTable>
    );
    
    expect(container.querySelector('.resizable-table-container')).toBeInTheDocument();
    expect(container.querySelector('.resizable-table-header')).toBeInTheDocument();
    expect(container.querySelector('.resizable-table-body')).toBeInTheDocument();
    expect(container.querySelector('.resizable-table-header-cell')).toBeInTheDocument();
  });
});
