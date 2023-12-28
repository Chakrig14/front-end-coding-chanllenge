import './App.css';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingleMovie from './components/SingleMovie';
import WatchLsit from './components/WatchList';

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
      },
      {
        path: "/watchlist",
        element: <WatchLsit />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
