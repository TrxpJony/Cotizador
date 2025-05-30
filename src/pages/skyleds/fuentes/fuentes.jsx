import { useEffect, useState, useRef } from "react";
import { Card, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { Pagination } from "@heroui/react";
import BackButton from "../../../components/common/backButton";
import { Search, Filter } from "lucide-react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import gsap from "gsap";

const baseUrl = import.meta.env.VITE_API_URL + "/api/detalleProductos";

const categorias = [
    { label: "Todas las categorias", key: "All" }
];

export function Fuentes() {
    const [list, setList] = useState([]); // Datos de la API
    const [filteredList, setFilteredList] = useState([]); // Datos filtrados
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState(null); // Elemento seleccionado para el modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const itemsPerPage = 15; // Elementos por página
    const cardsContainerRef = useRef(null);
    const lastAnimatedListRef = useRef([]);

    useEffect(() => {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data)) {
                    // Filtrar los datos para que solo se muestren los de categoria ""
                    const categoriaData = data.filter(item => item.categoria?.toLowerCase() === 'fuentes');
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
                item.color?.toLowerCase().split(/[\s,-]+/).includes(categoryKey?.toLowerCase())
            );

        setFilteredList(filtered);

        // Reset Pagination to the first page when filtering
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

    // Animaciones GSAP para los cards
    useEffect(() => {
        // solo animar si la lista de items cambio (no por el modal) 
        const currentIds = paginatedList.map(item => item.id || item.title);
        const lastIds = lastAnimatedListRef.current;
        const isDifferent =
            currentIds.length !== lastIds.length ||
            currentIds.some((id, i) => id !== lastIds[i]);
        if (cardsContainerRef.current && isDifferent) {
            gsap.fromTo(
                cardsContainerRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.07,
                    ease: "power2.inOut"
                }
            ),
                lastAnimatedListRef.current = currentIds
        }
    }, [paginatedList])

    return (
        <>
            <div className="w-full bg-white shadow-md p-4 flex flex-col mx-auto">
                <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
                    <p className="py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
                        Fuentes
                    </p>
                </div>
            </div>
            <div className="filtros grid grid-cols-3 gap-4 w-4/5 mx-auto items-center">
                {/* Barra de búsqueda más baja y con icono a la izquierda */}
                <div className="mt-6 col-span-2 sm:col-span-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => filterBySearchTerm(e.target.value)}
                        placeholder="Buscar Accessorio ..."
                        aria-label="Buscar accesorio" // Added aria-label for accessibility
                        className="w-full p-2 h-10 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                </div>
                {/* Filtro por categoría más bajo y con icono a la izquierda */}
                <div className="mt-6 flex col-span-1 sm:col-span-1 items-center ">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <Autocomplete
                        defaultItems={categorias}
                        defaultSelectedKey="All"
                        placeholder="Busca una categoría"
                        aria-label="Filtrar por categoría" // Added aria-label for accessibility
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
                    <div
                        className="gap-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5"
                        ref={cardsContainerRef}
                    >
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
                                <b className="overflow-hidden text-xs md:text-sm lg:text-base text-center">{item.title}</b>
                                <CardFooter className="px-4 flex flex-col items-start rounded-b-lg">
                                    <b className="text-sm md:text-base lg:text-lg text-cyan-500 font-bold ">
                                        {item.precio != null
                                            ? `$${item.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                            : 'Precio no disponible'}
                                    </b>
                                </CardFooter>
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
