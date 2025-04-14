
import Sidebar from "../components/common/Sidebar";
import CotiTable from "../components/cotizaciones/CotiTable";
import { useState } from "react";

const CotiPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	return (
		<>
			<div className='flex h-full  overflow-hidden'>
				<Sidebar />
				<div className='flex-1 overflow-auto relative z-10'>
					<header className='bg-white backdrop-blur-md shadow-lg border-b '>
						<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
							<h1 className='text-2xl font-semibold text-gray-700'>Cotizaciones</h1>
						</div>
					</header>

					<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
						<div>
							<input
								type="text"
								placeholder="Buscar cotizacion..."
								className="w-full p-3 border border-gray-300 rounded-2xl shadow-md focus-ring-2 focus:ring-cyan-500 focus:outline-none hover:bg-gray-200"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</div>

						<CotiTable searchTerm={searchTerm}/>

						{/* CHARTS */}
						<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};
export default CotiPage;
