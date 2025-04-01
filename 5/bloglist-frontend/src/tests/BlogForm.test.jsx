import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import BlogForm from '../components/BlogForm';

describe('<BlogForm />', () => {
  test('calls blog creation event handler with correct props when user creates new blog', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();

    render(<BlogForm onCreate={mockHandler} />);

    const titleInput = screen.getByPlaceholderText('title');
    const urlInput = screen.getByPlaceholderText('url');
    const authorInput = screen.getByPlaceholderText('author');
    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'a title')    
    await user.type(authorInput, 'an author')
    await user.type(urlInput, 'a url')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toBe('a title')
    expect(mockHandler.mock.calls[0][2]).toBe('a url')
    expect(mockHandler.mock.calls[0][1]).toBe('an author')
  });
});
