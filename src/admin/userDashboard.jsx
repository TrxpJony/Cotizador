import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FilePlus, FileText } from "lucide-react"; // Iconos modernos
import { FaFileDownload } from "react-icons/fa";
import logo from "../../src/img/logo.png"
const UserDashboard = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const now = new Date();
        const formatted = now.toLocaleString("es-CO", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
        setCurrentDate(formatted);
    }, []);

    return (
        <>
            {/* Encabezado */}

            <div className="p-4 w-full bg-white shadow-md flex flex-col mx-auto">
                <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
                    <p className="py-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
                        Panel de cotizador
                    </p>
                </div>
            </div>
            {/* Acciones principales */}
            {/* Resumen rápido */}

            <div className="max-w-5xl mx-auto mt-6 w-full px-8 sm:px-0">
                <div className="py-6">
                    <div className="w-full mx-auto mt-6 mb-4">
                        <div className=" pe-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow p-4">
                            <div>
                                <p className="text-gray-700 font-medium">Hoy es <span>{currentDate}</span></p>
                                <p className="text-gray-500 text-sm mt-1">¡Que tengas un excelente día de trabajo!</p>
                            </div>
                            <img src={logo} alt="Logo" className="w-20 h-20 object-contain hidden sm:block" />
                        </div>
                    </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div
                        onClick={() => navigate("/cotizador")}
                        className="cursor-pointer border border-cyan-500 rounded-2xl p-6 bg-transparent shadow hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FilePlus className="text-cyan-500" />
                            <h2 className="text-xl font-bold text-cyan-500">Nueva Cotización</h2>
                        </div>
                        <p className="text-gray-500">Inicia una nueva cotización desde cero.</p>
                    </div>

                    <div
                        onClick={() => navigate("/user-dashboard/cotizaciones")}
                        className="cursor-pointer border border-gray-700 rounded-2xl p-6 bg-transparent shadow hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="text-gray-700" />
                            <h2 className="text-xl font-bold text-gray-700">Cotizaciones</h2>
                        </div>
                        <p className="text-gray-500">Revisa el historial de cotizaciones creadas.</p>
                    </div>
                </div>
                {/* Explicación del módulo y botón de manual */}
                <div className="mt-10 mb-10 bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold  mb-1">¿Qué es el módulo de cotizador?</h3>
                        <p className="text-gray-700 text-sm max-w-xl">
                            Este módulo te permite crear, gestionar y consultar cotizaciones de manera rápida y sencilla. Utiliza las opciones disponibles para iniciar nuevas cotizaciones o revisar el historial de las ya creadas. Es una herramienta diseñada para optimizar tu flujo de trabajo y mantener un registro organizado de tus operaciones.
                        </p>
                    </div>
                    <a
                        href="/manual_usuario.pdf"
                        download
                        className="mt-4 border border-cyan-500 textsm:mt-0 inline-block px-6 py-2 rounded-2xl bg-transparent text-cyan-500 font-semibold shadow hover:bg-cyan-500 hover:text-white transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <FaFileDownload />
                            Descargar Manual de Usuario
                        </span>
                    </a>
                </div>

            </div>

        </>
    );
};

export default UserDashboard;
