import Sidebar from "../components/common/Sidebar";
import Info from "../components/common/info";
const AdmindPage = () => {

    return (
        <>
		<div className='flex h-full overflow-hidden'>
        			<Sidebar className='w-1/4 md:w-1/5 lg:w-1/6' />
					<div className='flex-grow overflow-auto'>
						<Info/>
					</div>
		</div>
		</>
    );
};
export default AdmindPage;
