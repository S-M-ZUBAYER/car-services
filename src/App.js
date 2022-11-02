import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Routes/Routes';

function App() {

  return (
    <div className="bg-slate-700 text-slate-50 max-w-screen-xl mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
