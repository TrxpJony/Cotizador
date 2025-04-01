import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tipos } from './pages/tipos';
import React, { useEffect } from "react";
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
import { Servicios } from './components/servicios';
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
import { Redondos } from './pages/espejos/redondos/redondos';
import { Cuadrados } from './pages/espejos/cuadrados/cuadrados';
import { Organicos } from './pages/espejos/organicos/organicos';
import { Marcos } from './pages/espejos/marcos/marcos';
import { DivisionesBaño } from './pages/divisiones/divisiones';
import { DivisionesdeBaño } from './pages/divisiones/divisionesbaño/divisionesbaño';
import { DiseñoDivisionesBaño } from './pages/divisiones/diseñosdivisionesbaño/diseñosdivisionesbaño';
import { Sandblasting } from './pages/sandblasting/sandblasting';
import { VitrinasVista } from './pages/vitrinas/vitrinasvista';
import { CocinasVista } from './pages/cocinas/cocinasvista';
import CotizadorEspejos from './pages/espejos/espejoRedondo/cotizadorespejos';
import CotizadorEspejosCuadrados from './pages/espejos/cuadrados/cotizadorespejoscuadrados';
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

const cookies = new Cookies();

export const AcmeLogo = () => {

  return (
    <img src={logo} alt="Acme Logo" height="85" width="85" />

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
          <Route path="proyectos" element={<TestimonialsPage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="admin" element={<ProtectedRoute element={<AdmindPage />} allowedRole="administrador" />} />
          <Route path='/products' element={<ProtectedRoute element={<ProductsPage />} allowedRole='administrador' />} />
          <Route path='/precios' element={<ProtectedRoute element={<PricePage />} allowedRole='administrador' />} />
          <Route path='/users' element={<ProtectedRoute element={<UsersPage />} allowedRole='administrador' />} />
          <Route path='/editPost' element={<ProtectedRoute element={<EditPostPage />} allowedRole='administrador' />} />
          <Route path='/addPost' element={<ProtectedRoute element={<AddPost />} allowedRole='administrador' />} />
          <Route path='/edit' element={<ProtectedRoute element={<EditPost />} allowedRole='administrador' />} />
          <Route path='/cotizaciones' element={<ProtectedRoute element={<CotiPage />} allowedRole='administrador' />} />
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
          <Route path="tipos/s3890" element={<ProtectedRoute element={<Sistema3890page />} allowedRole="cotizador" />} />
          <Route path="tipos/s3890/s38901" element={<ProtectedRoute element={<Sistema3890 />} allowedRole="cotizador" />} />
          <Route path="tipos/ast17/a171" element={<ProtectedRoute element={<Astral17 />} allowedRole="cotizador" />} />
          <Route path="tipos/ast17/a172" element={<ProtectedRoute element={<Astral17xx />} allowedRole="cotizador" />} />
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
          <Route path="p5" element={<ProtectedRoute element={<All />} allowedRole="cotizador" />} />
          <Route path='tipos' element={<Tipos />} />
          <Route path='aluminark' element={<ProtectedRoute element={<Tiposaluminark />} allowedRole="cotizador" />} />
          <Route path="aluminark/744" element={<ProtectedRoute element={<Sistema744page />} allowedRole="cotizador" />} />
          <Route path="aluminark/744/s741" element={<ProtectedRoute element={<Sistema744 />} allowedRole="cotizador" />} />
          <Route path="aluminark/744/s742" element={<ProtectedRoute element={<Sistema744xox />} allowedRole="cotizador" />} />
          <Route path="aluminark/8025" element={<ProtectedRoute element={<Sistema8025page />} allowedRole="cotizador" />} />
          <Route path="aluminark/8025/s80251" element={<ProtectedRoute element={<Sistema8025 />} allowedRole="cotizador" />} />
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
          <Route path="cat008" element={<All />} />
          <Route path="cat002" element={<CatalogoSkylesd />} />
          <Route path="led12" element={<Luzled12vista />} />
          <Route path="led110" element={<Luzled1101vista />} />
          <Route path="difusores" element={<PerfilesVista />} />
          <Route path="p4" element={<ProtectedRoute element={<TiposSkylesd />} allowedRole='cotizador' />} />
          <Route path="sk4" element={<Fuentes />} />
          <Route path="sk5" element={<Sensores />} />
          <Route path="sk6" element={<Sensoresc />} />
          <Route path="sk7" element={<Sensorese />} />
          <Route path="cat004" element={<DivisionesBaño />} />
          <Route path="cat004/div1" element={<DivisionesdeBaño />} />
          <Route path="cat004/div2" element={<DiseñoDivisionesBaño />} />
          <Route path="cat005" element={<Sandblasting />} />
          <Route path="cat006" element={<VitrinasVista />} />
          <Route path="cat007" element={<CocinasVista />} />
          <Route path="cat009" element={<Aluminark />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path="p3" element={<ProtectedRoute element={<CocinasCotizador />} allowedRole="cotizador" />} />
        </Routes>
      </div>
      <FooterComponent />
    </>

  )
}

export default App
