import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AmountInput from '../src/components/AmountInput';

describe('AmountInput', () => {
  it('renders with default props', () => {
    render(<AmountInput value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', '0.00');
  });

  it('displays value with thousands separators', () => {
    render(<AmountInput value="1000" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('1,000');
  });

  it('displays large numbers with separators', () => {
    render(<AmountInput value="1000000" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('1,000,000');
  });

  it('displays decimal values correctly', () => {
    render(<AmountInput value="1234.56" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('1,234.56');
  });

  it('handles empty value', () => {
    render(<AmountInput value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('calls onChange with sanitized value', () => {
    const handleChange = jest.fn();
    render(<AmountInput value="" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1,000' } });
    
    expect(handleChange).toHaveBeenCalledWith('1000');
  });

  it('removes non-numeric characters except decimal point', () => {
    const handleChange = jest.fn();
    render(<AmountInput value="" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc123.45def' } });
    
    expect(handleChange).toHaveBeenCalledWith('123.45');
  });

  it('allows only one decimal point', () => {
    const handleChange = jest.fn();
    render(<AmountInput value="" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123.45.67' } });
    
    expect(handleChange).toHaveBeenCalledWith('123.4567');
  });

  it('shows raw value on focus', () => {
    render(<AmountInput value="1000" onChange={() => {}} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('1,000');
    
    fireEvent.focus(input);
    expect(input).toHaveValue('1000');
  });

  it('reformats on blur', () => {
    render(<AmountInput value="1000" onChange={() => {}} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(input).toHaveValue('1000');
    
    fireEvent.blur(input);
    expect(input).toHaveValue('1,000');
  });

  it('can be disabled', () => {
    render(<AmountInput value="1000" onChange={() => {}} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('accepts custom placeholder', () => {
    render(<AmountInput value="" onChange={() => {}} placeholder="Enter amount" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter amount');
  });

  it('accepts custom id', () => {
    render(<AmountInput value="" onChange={() => {}} id="custom-id" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('handles negative numbers', () => {
    render(<AmountInput value="-1000" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('-1,000');
  });

  it('handles zero', () => {
    render(<AmountInput value="0" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('0');
  });
});
