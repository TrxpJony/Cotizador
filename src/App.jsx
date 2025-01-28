import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tipos } from './pages/tipos';
import React, { useEffect } from "react";
import ProtectedRoute from './components/ProtectedRoute';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, } from "@nextui-org/react";
import Cookies from 'universal-cookie';
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
import { TiposAccesorios } from './pages/accesorios/tipos';
import { Servicios } from './components/servicios';
import { Batientes } from './pages/accesorios/batientes/batientes';
import { Bisagras } from './pages/accesorios/bisagras/bisagras';
import { Divisiones } from './pages/accesorios/divisiones/divisiones';
import { Cerraduras } from './pages/accesorios/cerraduras/cerraduras';
import { Pasadores } from './pages/accesorios/pasadores/pasadores';
import { Soportes } from './pages/accesorios/soportes/soportes';
import { Brocas } from './pages/accesorios/brocas/brocas';
import { Manijas } from './pages/accesorios/manijas/manijas';
import { Chupas } from './pages/accesorios/chupas/chupas';
import { Deslizantes } from './pages/accesorios/deslizantes/Deslizantes';
import { Lijas } from './pages/accesorios/lijas/lijas';
import { Discos } from './pages/accesorios/discos/discos';
import { Maquina } from './pages/accesorios/maquina/maquinavpp';
import { Herramientas } from './pages/accesorios/herramientas/herramientas';
import { Fachadas } from './pages/accesorios/fachadas/fachadas';
import { Adhesivos } from './pages/accesorios/adhesivos/adhesivos';
import { Fotocurados } from './pages/accesorios/fotocurados/fotocurados';
import { TiposSkylesd } from './pages/skyleds/tipos';
import { Luzled1101 } from './pages/skyleds/luzled110/luzled110';
import { Luzled12 } from './pages/skyleds/luzled12/luzled12';
import Login from './admin/login';
import { Cotizador } from './components/cotizar';
import { Vitral } from './pages/Vitral';
import { CatalogoSkylesd } from './pages/skyleds/skyleds';
import { Luzled12vista } from './pages/skyleds/luzled12/luzled12vista';
import { Luzled1101vista } from './pages/skyleds/luzled110/luzled110vista';
import { Perfiles } from './pages/skyleds/perfiles/perfiles';
import { PerfilesVista } from './pages/skyleds/perfiles/perfilesvista';
import { Fuentes } from './pages/skyleds/fuentes/fuentes';
import { Sensores } from './pages/skyleds/sensores/sensores';
import { Sensoresc } from './pages/skyleds/sensorec/sensoresc';
import { Sensorese } from './pages/skyleds/sensorese/sensorese';
import { Espejos } from './pages/espejos/espejos';
import { Redondos } from './pages/espejos/redondos/redondos';
import { Cuadrados } from './pages/espejos/cuadrados/cuadrados';
import { Organicos } from './pages/espejos/organicos/organicos';
import { Marcos } from './pages/espejos/marcos/marcos';
import { DivisionesBaño } from './pages/divisiones/divisiones';
import { DivisionesdeBaño } from './pages/divisiones/divisionesbaño/divisionesbaño';
import { DiseñoDivisionesBaño } from './pages/divisiones/diseñosdivisionesbaño/diseñosdivisionesbaño';
import { Sandblasting } from './pages/sandblasting/sandblasting';
import { SandblastingFruteros } from './pages/sandblasting/fruteros/fruteros';
import { SandblastingFlores } from './pages/sandblasting/flores/flores';
import { SandblastingAnimales } from './pages/sandblasting/animales/animales';
import { SandblastingEsquineros } from './pages/sandblasting/esquineros/esquineros';
import { SandblastingCenefas } from './pages/sandblasting/cenefas/cenefas';
import { VitrinasVista } from './pages/vitrinas/vitrinasvista';
import { CocinasVista } from './pages/cocinas/cocinasvista';
import CotizadorEspejos from './pages/espejos/espejoRedondo/cotizadorespejos';
import CotizadorEspejosCuadrados from './pages/espejos/cuadrados/cotizadorespejoscuadrados';
import CotizadorEspejosconForma from './pages/espejos/espejosconForma/cotizadorespejosconforma';
import AdmindPage from './admin/admindPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import PricePage from './pages/PricePage';
const cookies = new Cookies();

export const AcmeLogo = () => {

  return (
    <img src={logo} alt="Acme Logo" height="85" width="85" />

  );
};

function App() {

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [userId, setUserId] = React.useState(undefined);
  const [userRole, setUserRole] = React.useState(undefined);

  useEffect(() => {
    const id = cookies.get('id');
    const role = cookies.get('rol');
    setUserId(id);
    setUserRole(role);
    console.log('User ID:', id);  // Muestra el ID del usuario
    console.log('User Role:', role);  // Muestra el rol del usuario
  }, []);

  const handleLogout = () => {
    cookies.remove('id');
    cookies.remove('rol');
    window.location.href = '/login'; // Redirigir a la página de login o cualquier otra página
  };

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Sobre Nosotros", path: "/nosotros" },
    { name: "Servicios", path: "/servicios" },
    { name: "Productos", path: "/productos" },
    { name: userId ? "Cotizar" : "Cotizar", path: userId ? "/cotizar" : "/login" }, // Mostrar según sesión
  ];

  if (userRole === 'administrador') {
    menuItems.push({ name: "Admin", path: "/admin" });
  }

  if (userId) {
    menuItems.push({
      name: "Cerrar sesión",
      path: "", // No tiene una URL real
      onClick: handleLogout
    });
  }

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
              {item.onClick ? (
                <button
                  onClick={item.onClick} // Llama a handleLogout si se hace clic en "Cerrar sesión"
                  className={`w-full ${item.name === "Cerrar sesión" ? "text-red-600" : isActive(item.path) ? "text-cyan-600" : "text-foreground"}`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  className={isActive(item.path) ? "text-cyan-600" : "text-foreground"}
                  href={item.path}
                >
                  {item.name}
                </Link>
              )}
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              {item.onClick ? (
                <button
                  onClick={item.onClick} // Llama a handleLogout si se hace clic en "Cerrar sesión"
                  className={`w-full ${item.name === "Cerrar sesión" ? "text-red-600" : isActive(item.path) ? "text-cyan-600" : "text-foreground"}`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  className={`w-full ${isActive(item.path) ? "text-cyan-600" : "text-foreground"}`}
                  href={item.path}
                  size="lg"
                >
                  {item.name}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className="fondo  min-h-screen container-app">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="cotizar"
            element={<ProtectedRoute element={<Cotizador />} allowedRole="cotizador" />}
          />
          <Route path="/" element={<Home />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="productos" element={<Productos />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="admin" element={<ProtectedRoute element={<AdmindPage />} allowedRole="administrador" />} />
          <Route path='/products' element={<ProtectedRoute element={<ProductsPage />} allowedRole='administrador' />} />
          <Route path='/precios' element={<ProtectedRoute element={<PricePage />} allowedRole='administrador' />} />
          <Route path="tipos/col" element={<ProtectedRoute element={<Colosalpage />} allowedRole="cotizador" />} />
          <Route path="tipos/col/cp1" element={<ProtectedRoute element={<Colosal />} allowedRole="cotizador" />} />
          <Route path="tipos/col/cp2" element={<ProtectedRoute element={<Colosalxx />} allowedRole="cotizador" />} />
          <Route path="tipos/col/cp3" element={<ProtectedRoute element={<Colosalxxx />} allowedRole="cotizador" />} />
          <Route path="tipos/col/cp4" element={<ProtectedRoute element={<Colosaloxxo />} allowedRole="cotizador" />} />
          <Route path="tipos/ast" element={<ProtectedRoute element={<Astral20page />} allowedRole="cotizador" />} />
          <Route path="tipos/ast/a201" element={<ProtectedRoute element={<Astral20 />} allowedRole="cotizador" />} />
          <Route path="tipos/ast/a202" element={<ProtectedRoute element={<Astral20xx />} allowedRole="cotizador" />} />
          <Route path="tipos/ast/a203" element={<ProtectedRoute element={<Astral20oxxo />} allowedRole="cotizador" />} />
          <Route path="tipos/ast/a204" element={<ProtectedRoute element={<Astral20xox />} allowedRole="cotizador" />} />
          <Route path="tipos/ast17" element={<ProtectedRoute element={<Astral17page />} allowedRole="cotizador" />} />
          <Route path="tipos/ast17/a171" element={<ProtectedRoute element={<Astral17 />} allowedRole="cotizador" />} />
          <Route path="tipos/ast17/a172" element={<ProtectedRoute element={<Astral17xx />} allowedRole="cotizador" />} />
          <Route path="tipos/c345" element={<ProtectedRoute element={<Colosal345page />} allowedRole="cotizador" />} />
          <Route path="tipos/c345/c3451" element={<ProtectedRoute element={<Colosal3 />} allowedRole="cotizador" />} />
          <Route path="tipos/c345/c3452" element={<ProtectedRoute element={<Colosal3xxx />} allowedRole="cotizador" />} />
          <Route path="tipos/c345/c3453" element={<ProtectedRoute element={<Colosal3oxxo />} allowedRole="cotizador" />} />
          <Route path="tipos/744" element={<ProtectedRoute element={<Sistema744page />} allowedRole="cotizador" />} />
          <Route path="tipos/744/s741" element={<ProtectedRoute element={<Sistema744 />} allowedRole="cotizador" />} />
          <Route path="tipos/8025" element={<ProtectedRoute element={<Sistema8025page />} allowedRole="cotizador" />} />
          <Route path="tipos/8025/s80251" element={<ProtectedRoute element={<Sistema8025 />} allowedRole="cotizador" />} />
          <Route path="tipos/s3890" element={<ProtectedRoute element={<Sistema3890page />} allowedRole="cotizador" />} />
          <Route path="tipos/s3890/s38901" element={<ProtectedRoute element={<Sistema3890 />} allowedRole="cotizador" />} />
          <Route path="tipos/kim" element={<ProtectedRoute element={<Kimbayapage />} allowedRole="cotizador" />} />
          <Route path="tipos/kim/kim1" element={<ProtectedRoute element={<Kymbaya />} allowedRole="cotizador" />} />
          <Route path="tipos/kim/kim2" element={<ProtectedRoute element={<Kimbayaxxx />} allowedRole="cotizador" />} />
          <Route path="tipos/kim/kim3" element={<ProtectedRoute element={<Kimbayaoxxo />} allowedRole="cotizador" />} />
          <Route path="tipos/zin" element={<ProtectedRoute element={<Zinupage />} allowedRole="cotizador" />} />
          <Route path="tipos/zin/zin1" element={<ProtectedRoute element={<Zinux />} allowedRole="cotizador" />} />
          <Route path="tipos/zin/zin2" element={<ProtectedRoute element={<Zinuox />} allowedRole="cotizador" />} />
          <Route path="tipos/sid" element={<ProtectedRoute element={<Sideralpage />} allowedRole="cotizador" />} />
          <Route path="tipos/sid/sid1" element={<ProtectedRoute element={<Sideralx />} allowedRole="cotizador" />} />
          <Route path="tipos/sid/sid2" element={<ProtectedRoute element={<Sideralxo />} allowedRole="cotizador" />} />
          <Route path="tipos/tai" element={<ProtectedRoute element={<TaironaPage />} allowedRole="cotizador" />} />
          <Route path="tipos/tai/tai1" element={<ProtectedRoute element={<Taironax />} allowedRole="cotizador" />} />
          <Route path="tipos/tai/tai2" element={<ProtectedRoute element={<Taironaxx />} allowedRole="cotizador" />} />
          <Route path="tipos/awa" element={<ProtectedRoute element={<AwaPage />} allowedRole="cotizador" />} />
          <Route path="tipos/awa/awa1" element={<ProtectedRoute element={<Awa2h />} allowedRole="cotizador" />} />
          <Route path="tipos/awa/awa2" element={<ProtectedRoute element={<Awa3h />} allowedRole="cotizador" />} />
          <Route path="tipos/awa/awa3" element={<ProtectedRoute element={<Awa4h />} allowedRole="cotizador" />} />
          <Route path="tipos/awa/awa4" element={<ProtectedRoute element={<Awa5h />} allowedRole="cotizador" />} />
          <Route path="tipos/awa/awa5" element={<ProtectedRoute element={<Awa6h />} allowedRole="cotizador" />} />
          <Route path='tipos' element={<Tipos />} />
          <Route path='cat001' element={<Vitral />} />
          <Route path="p2" element={<TiposEspejos />} />
          <Route path="p2/espe1" element={<CotizadorEspejos />} />
          <Route path="p2/espe2" element={<CotizadorEspejosCuadrados />} />
          <Route path="p2/espe3" element={<CotizadorEspejosconForma />} />
          <Route path='cat003' element={<Espejos />} />
          <Route path='cat003/espdis1' element={<Redondos />} />
          <Route path='cat003/espdis2' element={<Cuadrados />} />
          <Route path='cat003/espdis3' element={<Organicos />} />
          <Route path='cat003/espdis4' element={<Marcos />} />
          <Route path="cat008" element={<TiposAccesorios />} />
          <Route path="cat008/ac1" element={<Batientes />} />
          <Route path="cat008/ac2" element={<Bisagras />} />
          <Route path="cat008/ac3" element={<Divisiones />} />
          <Route path="cat008/ac4" element={<Pasadores />} />
          <Route path="cat008/ac5" element={<Cerraduras />} />
          <Route path="cat008/ac6" element={<Soportes />} />
          <Route path="cat008/ac7" element={<Brocas />} />
          <Route path="cat008/ac8" element={<Manijas />} />
          <Route path="cat008/ac9" element={<Chupas />} />
          <Route path="cat008/ac10" element={<Deslizantes />} />
          <Route path="cat008/ac11" element={<Lijas />} />
          <Route path="cat008/ac12" element={<Discos />} />
          <Route path="cat008/ac13" element={<Maquina />} />
          <Route path="cat008/ac14" element={<Herramientas />} />
          <Route path="cat008/ac15" element={<Fachadas />} />
          <Route path="cat008/ac16" element={<Adhesivos />} />
          <Route path="cat008/ac17" element={<Fotocurados />} />
          <Route path="cat002" element={<CatalogoSkylesd />} />
          <Route path="led12" element={<Luzled12vista />} />
          <Route path="led110" element={<Luzled1101vista />} />
          <Route path="difusores" element={<PerfilesVista />} />
          <Route path="p4" element={<ProtectedRoute element={<TiposSkylesd />} allowedRole='cotizador' />} />
          <Route path="p4/sk1" element={<ProtectedRoute element={<Luzled1101 />} allowedRole='cotizador' />} />
          <Route path="p4/sk2" element={<ProtectedRoute element={<Luzled12 />} allowedRole="cotizador" />} />
          <Route path="p4/sk3" element={<ProtectedRoute element={<Perfiles />} allowedRole="cotizador" />} />
          <Route path="sk4" element={<Fuentes />} />
          <Route path="sk5" element={<Sensores />} />
          <Route path="sk6" element={<Sensoresc />} />
          <Route path="sk7" element={<Sensorese />} />
          <Route path="cat004" element={<DivisionesBaño />} />
          <Route path="cat004/div1" element={<DivisionesdeBaño />} />
          <Route path="cat004/div2" element={<DiseñoDivisionesBaño />} />
          <Route path="cat005" element={<Sandblasting />} />
          <Route path="cat005/sand1" element={<SandblastingFruteros />} />
          <Route path="cat005/sand2" element={<SandblastingFlores />} />
          <Route path="cat005/sand3" element={<SandblastingAnimales />} />
          <Route path="cat005/sand4" element={<SandblastingEsquineros />} />
          <Route path="cat005/sand5" element={<SandblastingCenefas />} />
          <Route path="cat006" element={<VitrinasVista />} />
          <Route path="cat007" element={<CocinasVista />} />
          <Route path='/users' element={<UsersPage />} />
        </Routes>

      </div>
      <footer className="bg-white rounded-lg shadow m-4 w-4/5 mx-auto">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="https://flowbite.com/" className="hover:underline">Vidrio al Arte SAS. Cl. 71A #75 36, Bogotá</a>. TODOS LOS DERECHOS RESERVADOS.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Nosotros</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send/?phone=3223065256&text&type=phone_number&app_absent=0" className="hover:underline">contacto</a>
            </li>
          </ul>
        </div>
      </footer>
      <br />
    </>

  )
}

export default App
