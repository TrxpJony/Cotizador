import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import GoogleMap from '../nosotros/direccion';


export default function InfoContact() {
    return (
        <div className="w-full h-full flex py-10 sm:py-24 px-4 sm:px-8 items-center justify-center bg-white ">
            <div className="w-full max-w-2xl  rounded-2xl p-8 ">
                {/* Título principal */}
                <div className="text-left">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">Contáctanos</h2>
                    <div className="h-1 w-16 bg-cyan-500 rounded mb-4"></div>
                    <p className="text-lg text-gray-600">Estamos listos para ayudarte. Puedes comunicarte con nosotros a través de los siguientes medios:</p>
                </div>
                {/* Información de Contacto */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-500 font-semibold w-28">Teléfonos:</span>
                        <span className="text-gray-800 font-bold">3204391328</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-800 font-bold">3223065279</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-500 font-semibold w-28">Correo:</span>
                        <a href="mailto:ventas@vidrioalarte.com" className="text-cyan-600 font-bold hover:underline">ventas@vidrioalarte.com</a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-500 font-semibold w-28">Dirección:</span>
                        <span className="text-gray-800 font-bold">Cl. 71A #75 36, Bogotá, Colombia</span>
                    </div>
                </div>

                {/* Redes Sociales */}
                <div className="flex flex-col items-start space-y-2">
                    <span className="text-gray-500 font-semibold">Síguenos:</span>
                    <div className="flex space-x-5">
                        <a href="https://api.whatsapp.com/send/?phone=3223065256&text&type=phone_number&app:absent=0" target="_blank" rel="noopener noreferrer"
                            className="text-green-500 hover:text-green-600 transition-colors duration-150">
                            <FaWhatsapp size={32} />
                        </a>
                        <a href="https://www.facebook.com/vidrio.a.arte" target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 transition-colors duration-150">
                            <FaFacebook size={32} />
                        </a>
                        <a href="https://www.instagram.com/vidrioalartesas" target="_blank" rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-600 transition-colors duration-150">
                            <FaInstagram size={32} />
                        </a>
                    </div>
                </div>
                {/* Mapa */}
                <div className=" overflow-hidden mt-2">
                    <GoogleMap />
                </div>
                {/* Horarios de Atención */}
                <div className="bg-gray-50 rounded-lg p-4 mt-5">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Horario de Entregas</h3>
                    <div className="flex flex-col space-y-1 text-gray-600">
                        <div>
                            <span className="font-semibold text-gray-800">Lunes a Viernes:</span> 8:00 AM - 12:00 PM / 1:30 PM - 4:00 PM
                        </div>
                        <div>
                            <span className="font-semibold text-gray-800">Sábados:</span> 8:00 AM - 11:30 AM
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}