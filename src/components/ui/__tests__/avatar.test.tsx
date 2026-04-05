import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { Avatar, AvatarFallback, AvatarGroup } from '../avatar';

describe('Avatar', () => {
  it('renders with data-slot', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
  });

  it('renders fallback text', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );

    expect(within(container).getByText('JD')).toBeInTheDocument();
  });

  it('renders with size attribute', () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );

    const avatar = container.querySelector('[data-slot="avatar"]');
    expect(avatar).toHaveAttribute('data-size', 'lg');
  });

  it('renders avatar group', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );

    expect(container.querySelector('[data-slot="avatar-group"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="avatar"]')).toHaveLength(2);
  });
});
