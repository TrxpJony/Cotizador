import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { Pagination } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Search, Filter } from "lucide-react"; // Import icons
import BackButton from "../../components/common/backButton";

const baseUrl = import.meta.env.VITE_API_URL + "/api/detalleProductos";// Cambia la URL base



const categorias = [
  { label: "Todas las categorías", key: "All" },
  { label: "Luz led 12 V", key: "luzled12" },
  { label: "Luz led 110 V", key: "luzled110" },
  { label: "Perfiles con difusores", key: "perfiles" },
];


export function TiposSkylesd() {
  const [list, setList] = useState([]); // Datos de la API
  const [filteredList, setFilteredList] = useState([]); // Datos filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // Elemento seleccionado para el modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemsPerPage = 15; // Elementos por página
  const [quantity, setQuantity] = useState(0); // Cantidad en mm

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Filtrar los datos para que solo se muestren los de las categorías especificadas
          const categoriasPermitidas = [
            'luzled110', 'luzled12', 'perfiles'
          ];
          const categoriaData = data.filter(item =>
            categoriasPermitidas.includes(item.categoria?.toLowerCase())
          );
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

  const filterByCategory = (categoryKey) => {
    const filtered = !categoryKey || categoryKey === 'All'
      ? list
      : list.filter(item => item.categoria?.toLowerCase() === categoryKey?.toLowerCase());

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

  // Calcula el precio total basado en la cantidad
  const calculateTotalPrice = () => {
    return (quantity / 1000) * selectedItem.precio; // Convertir mm a metros
  };

  return (
    <>

      <div className="w-full bg-white shadow-md p-4 flex flex-col mx-auto">
        <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
          <p className="py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
            Catalogo Skyleds
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
        <div className="mt-6 flex col-span-1 sm:col-span-1 items-center gap-">
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
          <p className="text-center text-gray-500 mt-4">No se encontraron accesorios.</p>
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
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover "
                    radius="lg"
                    shadow="sm"
                    src={item.img}
                    width="100%"
                    height="auto"
                  />
                </CardBody>
                <b className="overflow-hidden font-bold text-xs md:text-sm lg:text-base ">{item.title}</b>
                <CardFooter className="py-2 px-4 flex flex-col items-start rounded-b-lg">
                  <p className="text-xs font-semibold md:text-sm lg:text-sm text-default-400 text-center">{item.color}</p>
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
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo(0, 0); // Desplazar hacia arriba
            }}
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
                  <b className="text-lg text-cyan-500 font-bold mt-2">Cotizar</b>
                  <div className="">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Cantidad (mm):
                    </label>
                    <input
                      type="number"
                      id="quantity"

                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
                      placeholder="ingresa la cantidad en milimetros"
                    />
                  </div>
                  <p className="mt-2 text-lg font-bold">Precio Total: ${calculateTotalPrice().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
