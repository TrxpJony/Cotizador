import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <footer className="bg-white px-4 md:px-16 lg:px-28 py-8">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div>
          <h2 className="text-lg font-bold mb-4">
            Quiénes Somos
          </h2>
          <p className="text-gray-700">
            En <span className="font-semibold">Vidrio al Arte SAS</span>, nos especializamos en la transformación de vidrio y acero, ofreciendo soluciones innovadoras y de alta calidad para proyectos arquitectónicos y decorativos.
          </p>
          <p className="text-gray-700 mt-2">
            Con años de experiencia en el sector, combinamos tecnología y diseño para crear espacios funcionales y estéticamente impactantes.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Accesos Directos</h2>
          <ul>
            <li className="mb-2"><a href="/" className="hover:underline text-gray-700">Inicio</a></li>
            <li className="mb-2"><a href="/contact" className="hover:underline text-gray-700">Contactenos</a></li>
            <li className="mb-2"><a href="/servicios" className="hover:underline text-gray-700">Servicios</a></li>
            <li className="mb-2"><a href="/nosotros" className="hover:underline text-gray-700">Nosotros</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Nuestras Redes</h2>
          <ul className="flex space-x-4">
            <li>
              <FaFacebookF className="text-blue-500" />{" "}
              <a href="https://www.facebook.com/p/Vidrios-Al-Arte-SAS-100069565487546/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">
                Facebook
              </a>
            </li>
            <li>
              <FaWhatsapp className="text-green-500" />
              <a href="https://api.whatsapp.com/send/?phone=3223065256&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">
                WhatsApp
              </a>
            </li>
            <li>
              <FaInstagram className="text-orange-500" />
              <a href="https://www.instagram.com/vidrioalartesas?igsh=MXd5ODdlOGpnMmt6ag==" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-600 pt-4 text-gray-700 text-center mt-6">
        <p> © 2024 <a href="https://maps.app.goo.gl/cxr3YbuHojn8BX1R7" target="_blank" rel="noopener noreferrer" className="hover:underline">Vidrio al Arte SAS. Cl. 71A #75 36, Bogotá</a>. TODOS LOS DERECHOS RESERVADOS.</p>
      </div>
    </footer>
  );
}