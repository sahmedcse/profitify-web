import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../table';

describe('Table', () => {
  it('renders table structure with data-slots', () => {
    const { container } = render(
      <Table>
        <TableCaption>A list of items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Item 1</TableCell>
            <TableCell>$100</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table-header"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table-body"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table-head"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table-cell"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table-caption"]')).toHaveTextContent(
      'A list of items',
    );
  });

  it('renders inside a scrollable container', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(container.querySelector('[data-slot="table-container"]')).toBeInTheDocument();
  });
});
