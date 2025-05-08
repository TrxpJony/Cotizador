import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Search, Filter } from "lucide-react"; // Import icons
import { Pagination } from "@heroui/react";

const baseUrl = import.meta.env.VITE_API_URL + "/api/catalogo";// Cambia la URL base

const categorias = [
  { label: "Todas las categorías", key: "All" },
  { label: "Sistemas de aluminio", key: "aluminio" },
  { label: "Espejos", key: "espejos" },
  { label: "Accesorios", key: "accesorios" },
];


export function Cotizador() {
  const [list, setList] = useState([]); // Datos de la API
  const [filteredList, setFilteredList] = useState([]); // Datos filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 15; // Elementos por página
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Filtrar los datos para que solo se muestren los de categoria ""
          const categoriaData = data.filter(item => item.tipo?.toLowerCase() === 'cotizar');
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
        item.categoria?.toLowerCase().includes(term.toLowerCase())
      );

    setFilteredList(filtered);

    // Siempre reinicia la paginación a la página 1 al cambiar la búsqueda
    setCurrentPage(1);
  };

  const filterByCategory = (categoryKey) => {
    const filtered = !categoryKey || categoryKey === 'All'
      ? list
      : list.filter(item => {
        const categories = item.categoria?.toLowerCase().split(/[\s,-]+/) || [];
        return categories.includes(categoryKey?.toLowerCase());
      });

    setFilteredList(filtered);

    // Reset pagination to the first page when filtering
    setCurrentPage(1);
  };

  // Calcula los elementos visibles según la página actual
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="w-full bg-white shadow-md p-4 flex flex-col mx-auto">
        <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
          <p className="py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
            Cotizar
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
          Mostrando {paginatedList.length} de {filteredList.length} disponibles.
        </p>
        {filteredList.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
        ) : (
          <div className="gap-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5">
            {paginatedList.map((item, index) => (
              <Card
                key={index}
                isPressable
                onPress={() => navigate(`/${item.ruta}`)} // Update the navigation path
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
                <CardFooter className="text-lg md:text-base lg:text-sm justify-between p-2 px-4">
                  <b>{item.title}</b>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        <div className="flex items-center mt-6">
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
    </>
  );
}
