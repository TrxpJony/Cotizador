import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Tipos } from './pages/tipos';
import React, { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Cookies from 'universal-cookie';
import logo from '../src/img/logo.png'
import Colosal from './pages/vidrios/colosalpc26/Colosal';
import Astral17 from './pages/vidrios/astral17/Astral17';
import Astral20 from './pages/vidrios/astral20/Astral20';
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
import Kimbayaoxxo from './pages/vidrios/kimbayas/Kimbayaoxxo';
import Astral17xx from './pages/vidrios/astral17/Astral17xx';
import Taironax from './pages/vidrios/tairona/taironax';
import { TaironaPage } from './pages/categorias/taironapage';
import Taironaxx from './pages/vidrios/tairona/taironaxx';
import { Inicio } from './components/Inicio';
import { Nosotros } from './components/nosotros';
import { Productos } from './components/productos';
import { TiposEspejos } from './pages/espejos/tipos';
import { TiposSkylesd } from './pages/skyleds/tipos';
import Login from './admin/login';
import { Cotizador } from './components/cotizar';
import { Vitral } from './pages/Vitral';
import { CatalogoSkylesd } from './pages/skyleds/skyleds';
import { Luzled12vista } from './pages/skyleds/luzled12/luzled12vista';
import { Luzled1101vista } from './pages/skyleds/luzled110/luzled110vista';
import { PerfilesVista } from './pages/skyleds/perfiles/perfilesvista';
import { Fuentes } from './pages/skyleds/fuentes/fuentes';
import { Sensores } from './pages/skyleds/sensores/sensores';
import { Sensoresc } from './pages/skyleds/sensorec/sensoresc';
import { Sensorese } from './pages/skyleds/sensorese/sensorese';
import { Espejos } from './pages/espejos/espejos';
import { DivisionesBaño } from './pages/divisiones/divisiones';
import { DivisionesdeBaño } from './pages/divisiones/divisionesbaño/divisionesbaño';
import { DiseñoDivisionesBaño } from './pages/divisiones/diseñosdivisionesbaño/diseñosdivisionesbaño';
import { Sandblasting } from './pages/sandblasting/sandblasting';
import { VitrinasVista } from './pages/vitrinas/vitrinasvista';
import { CocinasVista } from './pages/cocinas/cocinasvista';
import CotizadorEspejos from './pages/espejos/cuadrados/cotizadorespejos';
import CotizadorEspejosconForma from './pages/espejos/espejosconForma/cotizadorespejosconforma';
import AdmindPage from './admin/admindPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import PricePage from './pages/PricePage';
import CotiPage from './pages/cotiPage';
import CocinasCotizador from './pages/cocinas/cocinascotizador';
import Sistema744xox from './pages/vidrios/sistema744/sistema744xox';
import Astral20xox from './pages/vidrios/astral20/Astral20xox';
import { Tiposaluminark } from './pages/aluminark/tipos';
import { Aluminark } from './pages/aluminark/aluminark';
import TestimonialsPage from './pages/testimonialsPage';
import NavBarComponent from './components/Home/navBarComponent';
import FooterComponent from './components/Home/footerComponent';
import ContactPage from './pages/contact';
import Blog from './pages/posts/blog';
import EditPostPage from './pages/editBlogPage';
import AddPost from './pages/posts/add';
import { All } from './pages/accesorios/all';
import EditPost from './pages/posts/edit';
import CotizadorEspejosRedondos from './pages/espejos/espejoRedondo/cotizadorespejosredondos';
import ServiciosPage from './components/serviciosPage';
import EspejosInfoPage from './pages/ServiciosInfo/espejosInfoPage';
import DivisionesInfoPage from './pages/ServiciosInfo/divisionesInfoPage';

const cookies = new Cookies();

export const AcmeLogo = () => {

  return (
    <img src={logo} alt='Acme Logo' height='85' width='85' />

  );
};

function App() {
  const location = useLocation();
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

  return (
    <>
      <NavBarComponent userId={userId} userRole={userRole} location={location} />
      <div className='fondo  min-h-screen container-app'>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route
            path='cotizador'
            element={<ProtectedRoute element={<Cotizador />} allowedRole='cotizador' />}
          />
          <Route path='/' element={<Home />} />
          <Route path='inicio' element={<Inicio />} />
          <Route path='nosotros' element={<Nosotros />} />
          <Route path='servicios' element={<ServiciosPage />} />
          <Route path='servicios/espejos-acervid' element={<EspejosInfoPage />} />
          <Route path='servicios/divisiones-de-baño' element={<DivisionesInfoPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='proyectos' element={<TestimonialsPage />} />
          <Route path='blog' element={<Blog />} />
          <Route path='admin' element={<ProtectedRoute element={<AdmindPage />} allowedRole='administrador' />} />
          <Route path='/products' element={<ProtectedRoute element={<ProductsPage />} allowedRole='administrador' />} />
          <Route path='/precios' element={<ProtectedRoute element={<PricePage />} allowedRole='administrador' />} />
          <Route path='/users' element={<ProtectedRoute element={<UsersPage />} allowedRole='administrador' />} />
          <Route path='/editPost' element={<ProtectedRoute element={<EditPostPage />} allowedRole='administrador' />} />
          <Route path='/addPost' element={<ProtectedRoute element={<AddPost />} allowedRole='administrador' />} />
          <Route path='/edit' element={<ProtectedRoute element={<EditPost />} allowedRole='administrador' />} />
          <Route path='/cotizaciones' element={<ProtectedRoute element={<CotiPage />} allowedRole='administrador' />} />
          <Route path='cotizador/sistemas-vitral' element={<Tipos />} />
          <Route path='cotizador/sistemas-vitral/colosal-26' element={<ProtectedRoute element={<Colosalpage />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/colosal-26/xo-ox' element={<ProtectedRoute element={<Colosal />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/colosal-26/xx' element={<ProtectedRoute element={<Colosalxx />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/colosal-26/xxx' element={<ProtectedRoute element={<Colosalxxx />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/colosal-26/oxxo' element={<ProtectedRoute element={<Colosaloxxo />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-20' element={<ProtectedRoute element={<Astral20page />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-20/xo-ox' element={<ProtectedRoute element={<Astral20 />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-20/xx' element={<ProtectedRoute element={<Astral20xx />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-20/oxxo' element={<ProtectedRoute element={<Astral20oxxo />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-20/xox' element={<ProtectedRoute element={<Astral20xox />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-17' element={<ProtectedRoute element={<Astral17page />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-17/xo-ox' element={<ProtectedRoute element={<Astral17 />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/astral-17/xx' element={<ProtectedRoute element={<Astral17xx />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/kimbaya' element={<ProtectedRoute element={<Kimbayapage />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/kimbaya/xo-ox' element={<ProtectedRoute element={<Kymbaya />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/kimbaya/oxx-xxo-xxx' element={<ProtectedRoute element={<Kimbayaxxx />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/kimbaya/oxxo' element={<ProtectedRoute element={<Kimbayaoxxo />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/sideral-24' element={<ProtectedRoute element={<Sideralpage />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/sideral-24/x-plus' element={<ProtectedRoute element={<Sideralx />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/sideral-24/xo-plus' element={<ProtectedRoute element={<Sideralxo />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/3890' element={<ProtectedRoute element={<Sistema3890page />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/3890/x' element={<ProtectedRoute element={<Sistema3890 />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/tairona' element={<ProtectedRoute element={<TaironaPage />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/tairona/x' element={<ProtectedRoute element={<Taironax />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/tairona/xx' element={<ProtectedRoute element={<Taironaxx />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/zinu' element={<ProtectedRoute element={<Zinupage />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/zinu/x' element={<ProtectedRoute element={<Zinux />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-vitral/zinu/xo' element={<ProtectedRoute element={<Zinuox />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-aluminark' element={<ProtectedRoute element={<Tiposaluminark />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-aluminark/sistema-744' element={<ProtectedRoute element={<Sistema744page />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-aluminark/sistema-744/xo-ox' element={<ProtectedRoute element={<Sistema744 />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-aluminark/sistema-744/xox' element={<ProtectedRoute element={<Sistema744xox />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-aluminark/sistema-8025' element={<ProtectedRoute element={<Sistema8025page />} allowedRole='cotizador' />} />
          <Route path='cotizador/sistemas-aluminark/sistema-8025/xo-ox' element={<ProtectedRoute element={<Sistema8025 />} allowedRole='cotizador' />} />
          <Route path='cotizador/espejos' element={<TiposEspejos />} />
          <Route path='cotizador/espejos/redondo' element={<ProtectedRoute element={<CotizadorEspejosRedondos />} allowedRole='cotizador' />} />
          <Route path='cotizador/espejos/cuadrado' element={<ProtectedRoute element={<CotizadorEspejos />} allowedRole='cotizador' />} />
          <Route path='cotizador/espejos/forma' element={<ProtectedRoute element={<CotizadorEspejosconForma />} allowedRole='cotizador' />} />
          <Route path='cotizador/puertas-de-cocina' element={<ProtectedRoute element={<CocinasCotizador />} allowedRole='cotizador' />} />
          <Route path='productos' element={<Productos />} />
          <Route path='productos/diseños-de-espejos' element={<Espejos />} />
          <Route path='productos/accesorios' element={<All />} />
          <Route path='productos/catalogo-skyleds' element={<CatalogoSkylesd />} />
          <Route path='productos/catalogo-skyleds/difusores' element={<PerfilesVista />} />
          <Route path='productos/catalogo-skyleds/luz-led-110v' element={<Luzled1101vista />} />
          <Route path='productos/catalogo-skyleds/luz-led-12v' element={<Luzled12vista />} />
          <Route path='productos/catalogo-skyleds/fuentes' element={<Fuentes />} />
          <Route path='productos/catalogo-skyleds/sensores-para-espejos' element={<Sensores />} />
          <Route path='productos/catalogo-skyleds/sensores-para-cocina' element={<Sensoresc />} />
          <Route path='productos/catalogo-skyleds/sensores-especiales' element={<Sensorese />} />
          <Route path='productos/sistemas-vitral' element={<Vitral />} />
          <Route path='productos/sistemas-aluminark' element={<Aluminark />} />
          <Route path='productos/diseños-sandblasting' element={<Sandblasting />} />
          <Route path='productos/divisiones-de-baño' element={<DivisionesBaño />} />
          <Route path='productos/divisiones-de-baño/estilos' element={<DivisionesdeBaño />} />
          <Route path='productos/divisiones-de-baño/diseños' element={<DiseñoDivisionesBaño />} />
          <Route path='productos/vitrinas' element={<VitrinasVista />} />
          <Route path='productos/puertas-de-cocina' element={<CocinasVista />} />
          <Route path='p4' element={<ProtectedRoute element={<TiposSkylesd />} allowedRole='cotizador' />} />
        </Routes>
      </div>
      <FooterComponent />
    </>

  )
}

export default App
