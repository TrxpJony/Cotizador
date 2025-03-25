import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import BackButton from "../../../components/common/backButton";

const baseUrl = import.meta.env.VITE_API_URL + "/api/detalleProductos";


export function Maquina() {
    const [list, setList] = useState([]); // Datos de la API
    const [filteredList, setFilteredList] = useState([]); // Datos filtrados
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null); // Elemento seleccionado para el modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const itemsPerPage = 15; // Elementos por página

    useEffect(() => {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data)) {
                    // Filtrar los datos para que solo se muestren los de categoria ""
                    const categoriaData = data.filter(item => item.categoria?.toLowerCase() === 'maquina');
                    // Ordenar los datos por el nombre
                    categoriaData.sort((a, b) => a.title.localeCompare(b.title));
                    setList(categoriaData);
                    setFilteredList(categoriaData);
                } else {
                    console.error("La respuesta de la API no es un array válido.");
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Filtra los datos según el término de búsqueda
    const filterBySearchTerm = (term) => {
        setSearchTerm(term);

        const filtered = term === ''
            ? list
            : list.filter(item =>
                item.title?.toLowerCase().includes(term.toLowerCase()) ||
                item.description?.toLowerCase().includes(term.toLowerCase())
            );

        setFilteredList(filtered);

        // Siempre reinicia la paginación a la página 1 al cambiar la búsqueda
        setCurrentPage(1);
    };

    // Calcula los elementos visibles según la página actual
    const paginatedList = filteredList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Maneja la apertura del modal
    const handleCardPress = (item) => {
        setSelectedItem(item);
        onOpen();
    };

    return (
        <>
            <br />
            <div className="filter-frame">
                <br />
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
                    Maquina de Disco Amarillo rojo
                </p>
                <br />
                <div className="flex justify-between items-center">
                    {/* Barra de búsqueda */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => filterBySearchTerm(e.target.value)}
                        placeholder="Buscar Categoria"
                        className="peer block w-full sm:w-80 border-b-2 border-gray-400 bg-transparent px-3 py-2 outline-none focus:border-cyan-500 focus:ring-0 focus:placeholder-opacity-0 dark:text-white dark:placeholder:text-neutral-300 dark:focus:border-cyan-500"
                    />

                    {/* Componente de paginación */}
                    <div className="flex items-center ">
                        <Pagination showControls
                            classNames={{
                                base: "",
                                wrapper: "",
                                prev: "bg-white",
                                next: "bg-white",
                                item: "bg-transparent ",
                                cursor: "bg-cyan-500"
                            }}
                            initialPage={1}
                            page={currentPage} // Sincroniza el estado de la página con el componente
                            total={Math.ceil(filteredList.length / itemsPerPage)}
                            onChange={(page) => setCurrentPage(page)}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
            <br />
            <div className="card-frame">
                <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {paginatedList.map((item, index) => (
                        <Card
                            key={index}
                            isPressable
                            shadow="sm"
                            onPress={() => handleCardPress(item)}
                            className="nextui-card"
                        >
                            <CardBody className="overflow-hidden p-4">
                                <Image
                                    alt={item.title}
                                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-lg"
                                    radius="lg"
                                    shadow="sm"
                                    src={item.img}
                                    width="100%"
                                    height="auto"
                                />
                            </CardBody>
                            <b className="overflow-hidden p-2">{item.title}</b>
                            <CardFooter className="p-2 flex flex-col items-start bg-gray-100 rounded-b-lg">
                                <p className="text-sm text-gray-900 text-center">{item.description}</p>
                                <p className="text-sm text-default-400 text-center">Color: {item.color}</p>
                                <b className="text-lg text-cyan-500 font-bold mt-2">${item.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {/* Botón Regresar */}
                <div className="flex justify-between mt-6">
                    <BackButton />
                </div>
                <br />
                <div className="flex items-center ">
                    <Pagination showControls
                        classNames={{
                            base: "",
                            wrapper: "",
                            prev: "bg-white",
                            next: "bg-white",
                            item: "bg-transparent ",
                            cursor: "bg-cyan-500"
                        }}
                        initialPage={1}
                        page={currentPage} // Sincroniza el estado de la página con el componente
                        total={Math.ceil(filteredList.length / itemsPerPage)}
                        onChange={(page) => setCurrentPage(page)}
                        color="primary"
                    />
                </div>
            </div>
            <br />
            {/* Modal */}
            {selectedItem && (
                <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{selectedItem.title}</ModalHeader>
                                <ModalBody>
                                    <Image
                                        alt={selectedItem.title}
                                        className="w-full object-cover h-[200px] rounded-t-lg"
                                        radius="lg"
                                        shadow="sm"
                                        src={selectedItem.img}
                                        width="100%"
                                        height="450px"
                                    />
                                    <p>{selectedItem.description}</p>
                                    <p>Color: {selectedItem.color}</p>
                                    <b className="text-lg text-cyan-500 font-bold mt-2">${selectedItem.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
