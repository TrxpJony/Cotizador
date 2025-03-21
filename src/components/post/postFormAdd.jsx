import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import PropTypes from "prop-types";

const category = [
    { key: "Regalos", label: "Regalos" },
    { key: "Salidas", label: "Salidas" },
    { key: "Eventos", label: "Eventos" },
    { key: "Premios", label: "Premios" },
];

const PostFormAdd = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        image: null
    });
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-10">
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(formData);
            }}>
                <label className="block text-gray-700 font-bold mb-2">
                    Imagen
                </label>
                <div className="relative w-full h-96 bg-black/20 mb-5 rounded-xl">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <img 
                            className="w-full h-full object-cover rounded-xl" 
                            src={preview || "https://via.placeholder.com/800x600"} 
                            alt="Imagen" 
                        />
                    </div>
                    <label className="absolute outline rounded-2xl hover:outline-black hover:bg-black bottom-5 right-5 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline cursor-pointer transition-all">
                        Seleccionar
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Título
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border rounded-xl w-full py-2 px-3 text-gray-700 font-bold mb-2 hover:bg-default-200 focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Categoría
                    </label>
                    <Select
                        className="w-full"
                        classNames={{
                            trigger: "bg-white text-gray-700",
                            popoverContent: "bg-white",
                            selectorIcon: "text-black"
                        }}
                        items={category}
                        placeholder="Selecciona una categoría"
                        onChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                    >
                        {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                    </Select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Descripción
                    </label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border rounded-xl w-full h-44 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
            </form>
        </div>
    );
};
PostFormAdd.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default PostFormAdd;