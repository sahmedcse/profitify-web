import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

describe('Tabs', () => {
  it('renders tabs structure', () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(container.querySelector('[data-slot="tabs"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="tabs-list"]')).toBeInTheDocument();
  });

  it('renders tab triggers', () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">First</TabsTrigger>
          <TabsTrigger value="tab2">Second</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const view = within(container);
    expect(view.getByRole('tab', { name: 'First' })).toBeInTheDocument();
    expect(view.getByRole('tab', { name: 'Second' })).toBeInTheDocument();
  });

  it('shows active tab content', () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Active Content</TabsContent>
        <TabsContent value="tab2">Hidden Content</TabsContent>
      </Tabs>,
    );

    expect(within(container).getByText('Active Content')).toBeInTheDocument();
  });
});
