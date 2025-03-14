import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
   fetchBlogs()
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const userData = await loginService.login(username, password);
      setUser(userData);
      //save to local storage
      return true;
    } catch (error) {
      //error message display
      console.error(error);
      return false;
    }
  };

  return (
    <div>
      {user === null && <LoginForm onLogin={handleLogin} />}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
