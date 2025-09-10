import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import GoogleMap from '../nosotros/direccion';
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { AnimateInfoContact } from "../../utils/homeAnimation/gsapAnimationNosotros";

export default function InfoContact() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            AnimateInfoContact(containerRef.current); // <-- Pasa la referencia qui
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex py-24 sm:py-36 px-6 sm:px-8 items-center justify-center bg-white ">
            <div className="w-full max-w-2xl  rounded-2xl ">
                {/* Título principal */}
                <div className="text-left">
                    <h2 className="info-contact-title text-balance text-4xl info-contact-title font-extrabold  tracking-tight text-black mb-2 sm:text-5xl">Contáctanos</h2>
                    <div className="info-contact-text h-1 w-16 bg-cyan-500 rounded mb-4"></div>
                    <p className="info-contact-text text-lg/8 text-gray-700">Estamos listos para ayudarte. Puedes comunicarte con nosotros a través de los siguientes medios:</p>
                </div>
                {/* Información de Contacto */}
                <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
                    <div className="flex items-center space-x-3">
                        <span className="info-contact-text font-bold text-gray-600">Teléfonos:</span>
                        <span className="info-contact-contact text-gray-800 font-bold">3204391328</span>
                        <span className="info-contact-contact text-gray-400">|</span>
                        <span className="info-contact-contact text-gray-800 font-bold">3223065279</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="info-contact-text font-bold text-gray-600">Correo:</span>
                        <a href="mailto:ventas@vidrioalarte.com" className="info-contact-contact text-cyan-600 font-bold hover:underline">ventas@vidrioalarte.com</a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="info-contact-text font-bold text-gray-600">Dirección:</span>
                        <span className="info-contact-contact text-gray-800 font-bold">Cl. 71A #75 36, Bogotá, Colombia</span>
                    </div>
                </div>

                {/* Redes Sociales */}
                <div className="flex flex-col items-start space-y-2">
                    <span className="info-contact-text font-bold text-gray-600">Síguenos:</span>
                    <div className="flex space-x-5 mt-2">
                        <a href="https://api.whatsapp.com/send/?phone=573223065279&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
                            className="info-contact-icons text-green-500 hover:text-green-600 transition-colors duration-150">
                            <FaWhatsapp size={32} />
                        </a>
                        <a href="https://www.facebook.com/vidrio.a.arte" target="_blank" rel="noopener noreferrer"
                            className="info-contact-icons text-blue-600 hover:text-blue-700 transition-colors duration-150">
                            <FaFacebook size={32} />
                        </a>
                        <a href="https://www.instagram.com/vidrioalartesas" target="_blank" rel="noopener noreferrer"
                            className="info-contact-icons text-pink-500 hover:text-pink-600 transition-colors duration-150">
                            <FaInstagram size={32} />
                        </a>
                    </div>
                </div>
                {/* Mapa */}
                <div className="info-contact-icon overflow-hidden mt-2">
                    <GoogleMap />
                </div>
                {/* Horarios de Atención */}
                <div className="info-contact-icons bg-gray-50 rounded-2xl p-4 mt-2">
                    <h3 className="text-xl font-semibold text-gray-700">Horario de Atención</h3>
                    <div className="flex flex-col space-y-1 text-gray-600">
                        <div>
                            <span className="font-semibold text-gray-800">Lunes a Viernes:</span> 8:00 AM - 12:15 PM / 1:30 PM - 4:45 PM
                        </div>
                        <div>
                            <span className="font-semibold text-gray-800">Sábados:</span> 8:00 AM - 11:45 AM
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mt-2">Horario de Entregas</h3>
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