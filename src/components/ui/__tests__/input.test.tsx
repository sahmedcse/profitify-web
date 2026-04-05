import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Input } from '../input';

describe('Input', () => {
  it('renders an input element', () => {
    const { container } = render(<Input />);

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input');
  });

  it('renders with type prop', () => {
    const { container } = render(<Input type="email" />);

    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders with placeholder', () => {
    const { container } = render(<Input placeholder="Enter text" />);

    const input = container.querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('forwards disabled prop', () => {
    const { container } = render(<Input disabled />);

    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });
});
