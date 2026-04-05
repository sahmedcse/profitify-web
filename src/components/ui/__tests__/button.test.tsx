import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with default variant', () => {
    const { container } = render(<Button>Click me</Button>);

    const button = within(container).getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'button');
    expect(button).toHaveAttribute('data-variant', 'default');
    expect(button).toHaveAttribute('data-size', 'default');
  });

  it('renders with destructive variant', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);

    const button = within(container).getByRole('button', { name: 'Delete' });
    expect(button).toHaveAttribute('data-variant', 'destructive');
  });

  it('renders with different sizes', () => {
    const { container } = render(<Button size="sm">Small</Button>);

    const button = within(container).getByRole('button', { name: 'Small' });
    expect(button).toHaveAttribute('data-size', 'sm');
  });

  it('renders as child element when asChild is true', () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );

    const link = within(container).getByRole('link', { name: 'Link Button' });
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveAttribute('data-slot', 'button');
  });

  it('passes disabled prop', () => {
    const { container } = render(<Button disabled>Disabled</Button>);

    const button = within(container).getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });
});
