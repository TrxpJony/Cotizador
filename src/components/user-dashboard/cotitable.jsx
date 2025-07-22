import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import CotiTable from "../cotizaciones/CotiTable";
import BackButton from "../common/backButton";

const CotiUser = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState(""); // <-- Cambia a nombre
    const [rolUsuario, setRolUsuario] = useState("");

    useEffect(() => {
        const cookies = new Cookies();
        let rol = cookies.get("rol");
        let id = cookies.get("id");
        if (rol && rol.startsWith("User Role: ")) {
            rol = rol.replace("User Role: ", "");
        }
        if (id && id.startsWith("User ID: ")) {
            id = id.replace("User ID: ", "");
        }

        if (rol === "cotizador" && id) {
            // Obtén todos los usuarios y busca el nombre por el id
            fetch(`${import.meta.env.VITE_API_URL}/api/usuarios`)
                .then(res => res.json())
                .then(usuarios => {
                    const usuario = usuarios.find(u => String(u.id) === String(id));
                    setNombreUsuario(usuario ? usuario.usuario : "");
                    setRolUsuario(rol || "");
                });
        } else {
            setNombreUsuario(""); // Si es admin, no filtra por nombre
            setRolUsuario(rol || "");
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    return (
        <>
            <div className="p-4 w-full bg-white shadow-md flex flex-col mx-auto">
                <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
                    <p className="py-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
                        Cotizaciones
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <div>
                    <input
                        type="text"
                        placeholder="Buscar cotizacion..."
                        className="w-full p-3 border border-gray-300 rounded-2xl shadow-md focus-ring-2 focus:ring-cyan-500 focus:outline-none hover:bg-gray-200"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* Pasa el rol como prop */}
                <CotiTable searchTerm={searchTerm} usuarioActual={nombreUsuario} rolUsuario={rolUsuario} />
                <div className="flex justify-center mt-6">
                    <BackButton />
                </div>
            </div>
        </>
    )
}
export default CotiUser;