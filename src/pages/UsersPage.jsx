import UsersTable from "../components/users/UsersTable";
import Sidebar from "../components/common/Sidebar";
import UsersAdd from "../components/users/UsersAdd";
const UsersPage = () => {
	return (
		<>
			<div className='flex h-full  overflow-hidden'>
				<Sidebar />
				<div className='flex-1 overflow-auto relative z-10'>
					<header className='bg-white backdrop-blur-md shadow-lg border-b '>
						<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
							<h1 className='text-2xl font-semibold text-gray-700'>Productos</h1>
						</div>
					</header>
					<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
						{/* boton agregar usuario */}
						<UsersAdd />

						{/* STATS */}
						<UsersTable />

						{/* USER CHARTS */}
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};
export default UsersPage;
