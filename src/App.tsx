import {BrowserRouter, Route, Routes} from 'react-router';
import splash from '@/assets/images/splash.png';
import Home from '@/components/pages/Home';

function App() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-fixed px-2 py-12 text-center text-zinc-100"
      style={{
        backgroundImage: `url(${splash})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
    >
      <div className="container z-10 mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
