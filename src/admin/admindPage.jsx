import Sidebar from "../components/common/Sidebar";
import Info from "../components/common/info";
const AdmindPage = () => {

	return (
		<>
			<div className='flex h-screen overflow-hidden'>
				<Sidebar className='w-1/4 md:w-1/5 lg:w-1/6 h-full' />
				<div className='flex-grow overflow-auto h-full'>
					<Info />
				</div>
			</div>
		</>
	);
};
export default AdmindPage;
