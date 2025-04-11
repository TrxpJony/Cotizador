import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { Pagination } from "@heroui/react";
import BackButton from "../../../components/common/backButton";
import { Filter, Search } from "lucide-react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

const baseUrl = import.meta.env.VITE_API_URL + "/api/detalleProductos";

const categorias = [
    { label: "Todas las categorias", key: "All" },
];
export function PerfilesVista() {
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
                    const categoriaData = data.filter(item => item.categoria?.toLowerCase() === 'perfiles');
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

    const filterByCategory = (categoryKey) => {
        const filtered = !categoryKey || categoryKey === 'All'
            ? list
            : list.filter(item =>
                item.categoria?.toLowerCase().split(/[\s,-]+/).includes(categoryKey?.toLowerCase())
            );

        setFilteredList(filtered);

        // Reset pagination to the first page when filtering
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
            <div className="w-full bg-white shadow-md p-4 flex flex-col mx-auto">
                <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
                    <p className="py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
                        Perfiles led con difuzores
                    </p>
                </div>
            </div>
            <div className="filtros grid grid-cols-3 gap-4 w-4/5 mx-auto items-center">
                {/*Barra de búsqueda mas aja y con icono a la izquierda */}
                <div className="mt-6 col-span-2 sm:col-span-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => filterBySearchTerm(e.target.value)}
                        placeholder="Buscar Accesorio" // Added arial-label for accesibility
                        aria-label="Buscar Accesorio"
                        className="w-full p-2 h-10 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                </div>
                {/*Filtro por categoria más bajo y con icono a la izquierda */}
                <div className="mt-6 flex col-span-1 sm:col-span-1 items-center">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <Autocomplete
                        defaultItems={categorias}
                        dafalutSelectedKey="All"
                        placeholder="Busca una categoria"
                        aria-label="filtrar por categoria" // Added aria labelfor accessibility
                        className=""
                        onSelectionChange={(key) => filterByCategory(key)}
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                </div>
            </div>
            <br />
            <div className="card-frame">
                <p className="text-gray-600 text-sm">
                    Mostrando {paginatedList.length} de {filteredList.length} accesorios disponibles.
                </p>
                {filteredList.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
                ) : (
                    <div className="gap-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5">
                        {paginatedList.map((item, index) => (
                            <Card
                                key={index}
                                isPressable
                                onPress={() => handleCardPress(item)}
                                className="nextui-card"
                            >
                                <CardBody className="overflow-hidden p-4">
                                    <Image
                                        alt={item.title}
                                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
                                        radius="lg"
                                        shadow="sm"
                                        src={item.img}
                                        width="100%"
                                        height="auto"
                                    />
                                </CardBody>
                                <b className="overflow-hidden p-2 text-lg md:text-base lg:text-sm">{item.title}</b>
                                <b className="flex px-4 text-sm md:text-base lg:text-lg text-cyan-500 font-bold ">
                                    {item.precio != null
                                        ? `$${item.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                        : 'Precio no disponible'}
                                </b>
                                <CardFooter className="p-2 flex flex-col items-start bg-gray-100 rounded-b-lg">

                                    <p className="text-sm text-default-400 text-center">{item.color}</p>  </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
                {/* Botón Regresar */}
                <div className="flex justify-end mt-6">
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
            {
                selectedItem && (
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
                )
            }
        </>
    );
}
