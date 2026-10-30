import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import RichText from './RichText.jsx';

it('preserves existing rich content while isolating external tabs', () => {
  render(<RichText>{'Built with <strong>React</strong>.<br/><a href="https://example.com/project" target="_blank">Project</a>'}</RichText>);
  expect(screen.getByText('React').tagName).toBe('STRONG');
  expect(screen.getByRole('link', { name: 'Project' })).toHaveAttribute('rel', 'noopener noreferrer');
});
