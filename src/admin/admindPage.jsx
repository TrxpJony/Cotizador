import Sidebar from "../components/common/Sidebar";
import Info from "../components/common/info";
const AdmindPage = () => {

    return (
        <>
		<div className='flex h-screen overflow-hidden'>
        			<Sidebar />
					<div className='flex-grow'>
						<Info/>
					</div>
		</div>
		</>
    );
};
export default AdmindPage;
