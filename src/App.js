import './App.css';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleMovie from './components/SingleMovie';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/movies/:movieid",
        element: <SingleMovie />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
