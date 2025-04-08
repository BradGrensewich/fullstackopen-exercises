import { useState } from 'react';

const BlogForm = ({onCreate}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = async (event) => {
    event.preventDefault()
    const success = await onCreate(title, author, url)
    if (success) {
        setTitle('')
        setAuthor('')
        setUrl('')
    }
  }
  return (
    <form onSubmit={createBlog}>
      <h2>create new</h2>
      <div>
        title
        <input
          type='text'
          placeholder='title'
          value={title}
          name='title'
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          data-testid='title'></input>
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          placeholder='author'
          name='author'
          onChange={({ target }) => {
            setAuthor(target.value);
          }}></input>
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          placeholder='url'
          name='url'
          onChange={({ target }) => {
            setUrl(target.value);
          }}></input>
      </div>
      <button type='submit'>create</button>
    </form>
  );
};

export default BlogForm;
