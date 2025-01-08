import './App.css'
import { Route, Routes} from "react-router-dom"; 
import { Home } from "./pages/Home";
import { Tipos } from './pages/tipos';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import logo from '../src/img/logo.png'
import Colosal from './pages/vidrios/colosalpc26/Colosal';
import Astral17 from './pages/vidrios/astral17/Astral17';
import Astral20 from './pages/vidrios/astral20/Astral20';
import Colosal3 from './pages/vidrios/colosal345/colosal3';
import Kymbaya from './pages/vidrios/kimbayas/Kimbaya';
import { Colosalpage } from './pages/categorias/colosalpage';
import { Kimbayapage } from './pages/categorias/kimbayapage';
import Colosalxx from './pages/vidrios/colosalpc26/Colosalxx';
import Colosalxxx from './pages/vidrios/colosalpc26/Colosalxxx';
import Colosaloxxo from './pages/vidrios/colosalpc26/Colosaloxxo';
import Sistema744 from './pages/vidrios/sistema744/sistema744';
import { Sistema744page } from './pages/categorias/sistema744page';
import { Astral20page } from './pages/categorias/astral20page';
import { Sistema8025page } from './pages/categorias/sistema8025page';
import Sistema8025 from './pages/vidrios/sistema8025/sistema8025';
import { Astral17page } from './pages/categorias/astral17page';
import { Colosal345page } from './pages/categorias/colosal345page';
import Astral20xx from './pages/vidrios/astral20/Astral20xx';
import { Sistema3890page } from './pages/categorias/sistema3890page';
import Sistema3890 from './pages/vidrios/sistema3890/sistema3890';
import Kimbayaxxx from './pages/vidrios/kimbayas/Kimbayaxxx';
import { Zinupage } from './pages/categorias/zinypage';
import Zinux from './pages/vidrios/zinu/zinux';
import Zinuox from './pages/vidrios/zinu/zinuox';
import { Sideralpage } from './pages/categorias/sideralPage';
import Sideralx from './pages/vidrios/sideral/sideralx';
import Astral20oxxo from './pages/vidrios/astral20/Astral20oxxo';


export const AcmeLogo = () => {
  return (
      <img src={logo}  alt="Acme Logo" height="85" width="85" />

  );
};

function App() {

  return (
  
    <>
<Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit"></p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">     
        <NavbarItem >
          <Link color="foreground" aria-current="page" href="/">
            Catalogo
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        
      </NavbarContent>
    </Navbar>
    
      <div className="fondo  min-h-screen container-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='col' element={<Colosalpage/>}/>
          <Route path='col/cp1' element={<Colosal />} />
          <Route path='col/cp2' element={<Colosalxx />} />
          <Route path='col/cp3' element={<Colosalxxx />} />
          <Route path='col/cp4' element={<Colosaloxxo />} />
          <Route path='ast' element={<Astral20page/>}/>
          <Route path='ast/a201' element={<Astral20 />} />
          <Route path='ast/a202' element={<Astral20xx />} />
          <Route path='ast/a203' element={<Astral20oxxo />} />
          <Route path='ast17' element={<Astral17page />} />
          <Route path='ast17/a171' element={<Astral17 />} />
          <Route path='c345' element={<Colosal345page />} />
          <Route path='c345/c3451' element={<Colosal3 />} />
          <Route path='744' element={<Sistema744page />} />
          <Route path='744/s741' element={<Sistema744 />} />
          <Route path='8025' element={<Sistema8025page />} />
          <Route path='8025/s80251' element={<Sistema8025/>} />
          <Route path='s3890' element={<Sistema3890page/>} />
          <Route path='s3890/s38901' element={<Sistema3890/>} />
          <Route path='kim' element={<Kimbayapage />} />
          <Route path='kim/kim1' element={<Kymbaya />} />
          <Route path='kim/kim2' element={<Kimbayaxxx/>}/>
          <Route path='zin' element={<Zinupage />} />
          <Route path='zin/zin1' element={<Zinux />} />
          <Route path='zin/zin2' element={<Zinuox />} />
          <Route path='sid' element={<Sideralpage />} />
          <Route path='sid/sid1' element={<Sideralx/>} />
          <Route path='tipos' element={<Tipos/>}/>
          

        </Routes>
      </div>
      <footer className="bg-white rounded-lg shadow m-4 w-4/5 mx-auto">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://flowbite.com/" className="hover:underline">Vidrio al Arte S.A.S</a>. TODOS LOS DERECHOS RESERVADOS.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
    <br />
    </>
  )
}

export default App
