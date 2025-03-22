import { IoCaretBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="flex rounded-2xl text-gray-400 hover:text-black  font-bold py-2 px-6  transition-all"
            >
                <IoCaretBackOutline className="mt-1" />  Regresar
            </button>
        </>
    );
};

export default BackButton