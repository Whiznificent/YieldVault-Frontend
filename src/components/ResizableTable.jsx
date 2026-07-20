import { useState, useRef, useCallback, useEffect } from 'react';

export default function ResizableTable({ columns, children }) {
  const [columnWidths, setColumnWidths] = useState(
    columns.map((col) => col.width)
  );
  const [resizingIndex, setResizingIndex] = useState(null);
  const tableRef = useRef(null);

  const handleMouseDown = useCallback(
    (index) => (e) => {
      e.preventDefault();
      setResizingIndex(index);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (resizingIndex === null || !tableRef.current) return;

      const tableRect = tableRef.current.getBoundingClientRect();
      const mouseX = e.clientX - tableRect.left;
      
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        const minWidth = 80; // Minimum column width in pixels
        
        // Calculate new width for the column being resized
        let newWidth = mouseX;
        
        // Ensure minimum width
        if (newWidth < minWidth) newWidth = minWidth;
        
        // Ensure the column doesn't exceed available space
        const totalWidth = tableRect.width;
        const otherColumnsWidth = newWidths.reduce(
          (sum, width, i) => (i === resizingIndex ? 0 : sum + width),
          0
        );
        
        if (newWidth > totalWidth - otherColumnsWidth - (columns.length - 1) * minWidth) {
          newWidth = totalWidth - otherColumnsWidth - (columns.length - 1) * minWidth;
        }
        
        newWidths[resizingIndex] = newWidth;
        return newWidths;
      });
    },
    [resizingIndex, columns.length]
  );

  const handleMouseUp = useCallback(() => {
    setResizingIndex(null);
  }, []);

  useEffect(() => {
    if (resizingIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizingIndex, handleMouseMove, handleMouseUp]);

  const gridTemplateColumns = columnWidths.map((w) => `${w}px`).join(' ');

  return (
    <div className="resizable-table-container">
      <div className="resizable-table-header" style={{ gridTemplateColumns }}>
        {columns.map((column, index) => (
          <div key={column.id} className="resizable-table-header-cell">
            <span>{column.header}</span>
            {index < columns.length - 1 && (
              <div
                className="resize-handle"
                onMouseDown={handleMouseDown(index)}
                style={{ cursor: resizingIndex === index ? 'col-resize' : 'col-resize' }}
              />
            )}
          </div>
        ))}
      </div>
      <div
        ref={tableRef}
        className="resizable-table-body"
        style={{ gridTemplateColumns }}
      >
        {children}
      </div>
    </div>
  );
}
