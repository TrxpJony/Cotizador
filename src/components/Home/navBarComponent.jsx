import React from "react";
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { AcmeLogo } from "../../App";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

export default function NavBarComponent({ userId, userRole, location }) {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
    cookies.remove('id');
    cookies.remove('rol');
    window.location.href = '/'; // Redirigir a la página de inicio
  };

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Productos", path: "/productos" },
  ];

  // Añadir "Admin" solo si el rol es "administrador"
  if (userRole === 'administrador') {
    menuItems.push({ name: "Cotizador", path: "/cotizar" });
    menuItems.push({ name: "Admin", path: "/admin" });
  }

  if (userRole === 'cotizador') {
    menuItems.push({ name: "Cotizador", path: "/cotizar" });
  }


  const isActive = (path) => location.pathname === path;

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Alterna el estado
        />
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className={`text-foreground hover:text-cyan-400 ${isActive("/") ? "text-cyan-600" : ""}`} href="/">
            Inicio
          </Link>
        </NavbarItem>
        <Dropdown className="bg-white/80">
          <NavbarItem>
            <DropdownTrigger>
              <Button className={`p-0 bg-transparent text-medium text-foreground hover:text-cyan-400 ${isActive("/nosotros") ? "text-cyan-600" : ""}`}>
                Nosotros
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="rounded-xl"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              className=""
              key="nosotros"
              description="Lideramos la transformación de vidrios y espejos."
              onClick={() => navigate("/nosotros")}
            >
              Misión y Visión
            </DropdownItem>
            <DropdownItem
              key="blog"
              description="Eventos, regalos y novedades de Vidrio al Arte."
              onClick={() => navigate("/blog")}
            >
              Blog
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link className={`text-foreground hover:text-cyan-400 ${isActive("/servicios") ? "text-cyan-600" : ""}`} href="/servicios">
            Servicios
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className={`text-foreground hover:text-cyan-400 ${isActive("/productos") ? "text-cyan-600" : ""}`} href="/productos">
            Productos
          </Link>
        </NavbarItem>

        {(userRole === 'cotizador' || userRole === 'administrador') && (
          <NavbarItem>
            <Link className={`text-foreground hover:text-cyan-400 ${isActive("/cotizar") ? "text-cyan-600" : ""}`} href="/cotizar">
              Cotizar
            </Link>
          </NavbarItem>
        )}

        {/* Mostrar "Admin" solo si el rol es "administrador" */}
        {userRole === 'administrador' && (
          <NavbarItem>
            <Link className={`text-foreground hover:text-cyan-400 ${isActive("/admin") ? "text-cyan-600" : ""}`} href="/admin">
              Admin
            </Link>
          </NavbarItem>
        )}

      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {userId ? (
            <motion.div
              className="px-4 py-1 rounded-2xl text-foreground bg-transparent border border-foreground hover:bg-foreground hover:text-white transition-all"
              whileHover={{ scale: 1.05 }} // Efecto al pasar el cursor
              onClick={handleLogout}
            >
              Cerrar sesión
            </motion.div>
          ) : (
            <Link href="/login">
              <motion.div
                className="px-4 py-1 rounded-2xl text-cyan-600 bg-transparent border border-cyan-600 hover:bg-cyan-600 hover:text-white transition-all"
                whileHover={{ scale: 1.05 }} // Efecto al pasar el cursor
              >
                Acceder
              </motion.div>
            </Link>
          )}
        </NavbarItem>
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
        {/* Dropdown for mobile view */}
        <NavbarMenuItem>
          <Dropdown className="bg-white/80">
            <DropdownTrigger>
              <Button className="w-full text-xl text-foreground bg-transparent hover:text-cyan-400 ">
                Nosotros
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Más opciones"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="mision"
                description="Lideramos la transformación de vidrios y espejos."
                onClick={() => {
                  navigate("/nosotros");
                  setIsMenuOpen(false); // Cerrar el menú después de la navegación
                }}
              >
                Misión y Visión
              </DropdownItem>
              <DropdownItem
                key="blog"
                description="Eventos, regalos y novedades de Vidrio al Arte."
                onClick={() => {
                  navigate("/blog");
                  setIsMenuOpen(false); // Cerrar el menú después de la navegación
                }}
              >
                Blog
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

NavBarComponent.propTypes = {
  userId: PropTypes.string,
  userRole: PropTypes.string,
  location: PropTypes.object.isRequired,
};
