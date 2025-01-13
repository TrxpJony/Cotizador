import './App.css'
import { Route, Routes, useLocation } from "react-router-dom"; 
import { Home } from "./pages/Home";
import { Tipos } from './pages/tipos';
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link,} from "@nextui-org/react";
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
import Sideralxo from './pages/vidrios/sideral/sideralxo';
import Colosal3xxx from './pages/vidrios/colosal345/colosal3xxx';
import Colosal3oxxo from './pages/vidrios/colosal345/colosal3oxxo';
import Kimbayaoxxo from './pages/vidrios/kimbayas/Kimbayaoxxo';
import Astral20xox from './pages/vidrios/astral20/Astral20xox';
import Astral17xx from './pages/vidrios/astral17/Astral17xx';
import Taironax from './pages/vidrios/tairona/taironax';
import { TaironaPage } from './pages/categorias/taironapage';
import Taironaxx from './pages/vidrios/tairona/taironaxx';
import { AwaPage } from './pages/categorias/awapage';
import Awa2h from './pages/vidrios/awa/awa1h';
import Awa3h from './pages/vidrios/awa/awa2h';
import Awa4h from './pages/vidrios/awa/awa3h';
import Awa5h from './pages/vidrios/awa/awa4';
import Awa6h from './pages/vidrios/awa/awa5h';
import { Inicio } from './components/Inicio';
import { Nosotros } from './components/nosotros';

import { Productos } from './components/productos';
import { TiposEspejos } from './pages/espejos/tipos';
import EspejoRedondo from './pages/espejos/espejoRedondo/espejoRedondo';


export const AcmeLogo = () => {
  return (
      <img src={logo}  alt="Acme Logo" height="85" width="85" />

  );
};

function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Acerca de Nosotros", path: "/nosotros" },
    { name: "Producots", path: "/productos" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
  
    <>
 <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit"></p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link
                className={isActive(item.path) ? "text-cyan-600" : "text-foreground"}
                href={item.path}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className={`w-full ${isActive(item.path) ? "text-cyan-600" : "text-foreground"}`}
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    
      <div className="fondo  min-h-screen container-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="productos" element={<Productos />} />
          <Route path="p2" element={<TiposEspejos />} />
          <Route path="p2/espe1" element={<EspejoRedondo />} />
          <Route path='tipos/col' element={<Colosalpage/>}/>
          <Route path='tipos/col/cp1' element={<Colosal />} />
          <Route path='tipos/col/cp2' element={<Colosalxx />} />
          <Route path='tipos/col/cp3' element={<Colosalxxx />} />
          <Route path='tipos/col/cp4' element={<Colosaloxxo />} />
          <Route path='tipos/ast' element={<Astral20page/>}/>
          <Route path='tipos/ast/a201' element={<Astral20 />} />
          <Route path='tipos/ast/a202' element={<Astral20xx />} />
          <Route path='tipos/ast/a203' element={<Astral20oxxo />} />
          <Route path='tipos/ast/a204' element={<Astral20xox />} />
          <Route path='tipos/ast17' element={<Astral17page />} />
          <Route path='tipos/ast17/a171' element={<Astral17 />} />
          <Route path='tipos/ast17/a172' element={<Astral17xx />} />
          <Route path='tipos/c345' element={<Colosal345page />} />
          <Route path='tipos/c345/c3451' element={<Colosal3 />} />
          <Route path='tipos/c345/c3452' element={<Colosal3xxx />} />
          <Route path='tipos/c345/c3453' element={<Colosal3oxxo />} />
          <Route path='tipos/744' element={<Sistema744page />} />
          <Route path='tipos/744/s741' element={<Sistema744 />} />
          <Route path='tipos/8025' element={<Sistema8025page />} />
          <Route path='tipos/8025/s80251' element={<Sistema8025/>} />
          <Route path='tipos/s3890' element={<Sistema3890page/>} />
          <Route path='tipos/s3890/s38901' element={<Sistema3890/>} />
          <Route path='tipos/kim' element={<Kimbayapage />} />
          <Route path='tipos/kim/kim1' element={<Kymbaya />} />
          <Route path='tipos/kim/kim2' element={<Kimbayaxxx/>}/>
          <Route path='tipos/kim/kim3' element={<Kimbayaoxxo/>}/>
          <Route path='tipos/zin' element={<Zinupage />} />
          <Route path='tipos/zin/zin1' element={<Zinux />} />
          <Route path='tipos/zin/zin2' element={<Zinuox />} />
          <Route path='tipos/sid' element={<Sideralpage />} />
          <Route path='tipos/sid/sid1' element={<Sideralx/>} />
          <Route path='tipos/sid/sid2' element={<Sideralxo/>} />
          <Route path='tipos/tai' element={<TaironaPage/>} />
          <Route path='tipos/tai/tai1' element={<Taironax/>} />
          <Route path='tipos/tai/tai2' element={<Taironaxx/>} />
          <Route path='tipos/awa' element={<AwaPage/>} />
          <Route path='tipos/awa/awa1' element={<Awa2h/>} />
          <Route path='tipos/awa/awa2' element={<Awa3h/>} />
          <Route path='tipos/awa/awa3' element={<Awa4h/>} />
          <Route path='tipos/awa/awa4' element={<Awa5h/>} />
          <Route path='tipos/awa/awa5' element={<Awa6h/>} />
          <Route path='tipos' element={<Tipos/>}/>
        </Routes>
      </div>
      <footer className="bg-white rounded-lg shadow m-4 w-4/5 mx-auto">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://flowbite.com/" className="hover:underline">Vidrio al Arte SAS. Cl. 71A #75 36, Bogotá</a>. TODOS LOS DERECHOS RESERVADOS.
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
