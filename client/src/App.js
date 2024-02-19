import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import { UserContextProvider } from './context/UserContext';
import MyBlogs from './pages/MyBlogs';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <UserContextProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/posts/post/:id' element={<PostDetails />} />
        <Route path='/write' element={<CreatePost />} />
        <Route path='/edit/:id' element={<EditPost />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/myblogs/:id' element={<MyBlogs />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
