import {  Menu, ShoppingBag, DollarSign,  Users, DatabaseBackup, BookPlus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "Productos", icon: ShoppingBag, color: "#06b6d4", href: "/products" },
	{ name: "Usuarios", icon: Users, color: "#06b6d4", href: "/users" },
	{ name: "Precios", icon: DollarSign, color: "#06b6d4", href: "/precios" },
	{ name: "Blog", icon: BookPlus, color: "06b6d4", href: "/editPost"},
	{ name: "Cotizaciones", icon: DatabaseBackup, color: "#06b6d4", href: "/cotizaciones" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className=' h-full min-h-screen bg-white bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r '>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-cyan-400 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm rounded-lg hover:bg-cyan-400 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;
