import React from "react";
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { AcmeLogo } from "../../App";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function NavBarComponent({ userId, userRole, location }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
  );
}

NavBarComponent.propTypes = {
  userId: PropTypes.string,
  userRole: PropTypes.string,
  location: PropTypes.object.isRequired,
};