import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { CustomTabs } from './CustomTabs';

describe('UI/Tabs', () => {
  it('switches content when clicking tabs', () => {
    render(
      <CustomTabs
        tabs={[
          { id: 0, label: 'Tab 1', element: <div>Content 1</div> },
          { id: 1, label: 'Tab 2', element: <div>Content 2</div> },
        ]}
      />
    );

    // Shows first by default
    expect(screen.getByText('Content 1')).toBeTruthy();
    // Switch to second
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 2')).toBeTruthy();
  });
});
