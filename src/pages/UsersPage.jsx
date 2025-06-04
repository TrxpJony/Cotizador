import UsersTable from "../components/users/UsersTable";
import Sidebar from "../components/common/Sidebar";
import UsersAdd from "../components/users/UsersAdd";
import { useState } from "react";

const UsersPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	return (
		<>
			<div className='flex h-screen sm:h-screen overflow-hidden'>
				<Sidebar className='w-1/4 md:w-1/5 lg:w-1/6' />
				<div className="flex-grow overflow-auto">
					<div className='flex-1 overflow-auto sm:overscroll-none relative z-10'>
						<header className='bg-white backdrop-blur-md shadow-lg border-b '>
							<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
								<h1 className='text-2xl font-semibold text-gray-700'>Productos</h1>
							</div>
						</header>
						<main className='container mx-auto p-4 mb-4 max-w-7xl'>
							<div className="mt-5">
								<input
									type="text"
									placeholder="Buscar usuarios..."
									className="w-full p-3 border border-gray-300 rounded-2xl shadow-lg focus:ring-cyan-500 focus:outline-none hover:bg-gray-200"
									value={searchTerm}
									onChange={handleSearchChange}
								/>
							</div>
							{/* boton agregar usuario */}
							<UsersAdd />

							{/* STATS */}
							<UsersTable searchTerm={searchTerm} />

							{/* USER CHARTS */}
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
};
export default UsersPage;
