import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

describe('Card', () => {
  it('renders card with data-slot', () => {
    const { container } = render(<Card>Content</Card>);

    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Content');
  });

  it('renders full card structure', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="card-title"]')).toHaveTextContent('Title');
    expect(container.querySelector('[data-slot="card-description"]')).toHaveTextContent(
      'Description',
    );
    expect(container.querySelector('[data-slot="card-content"]')).toHaveTextContent('Body');
    expect(container.querySelector('[data-slot="card-footer"]')).toHaveTextContent('Footer');
  });

  it('forwards className to card', () => {
    const { container } = render(<Card className="custom-class">Test</Card>);

    const card = container.querySelector('[data-slot="card"]');
    expect(card).toHaveClass('custom-class');
  });
});
