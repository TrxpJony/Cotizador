import { useEffect, useState, useRef } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@heroui/react";
import BackButton from "../../components/common/backButton";
import { Filter, Search } from "lucide-react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import gsap from "gsap";

const baseUrl = import.meta.env.VITE_API_URL + "/api/catalogo";

const categorias = [
  { label: "Todas las categorias", key: "All" },
  { label: "Luces Led", key: "luz" },
  { label: "Sensores", key: "sensores" },
  { label: "fuentes", key: "fuentes" },
  { label: "perfiles", key: "perfiles" }
];

export function CatalogoSkylesd() {
  const [list, setList] = useState([]); // Datos de la API
  const [filteredList, setFilteredList] = useState([]); // Datos filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 15; // Elementos por página
  const navigate = useNavigate();
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Filtrar los datos para que solo se muestren los de categoria ""
          const categoriaData = data.filter(item => item.tipo?.toLowerCase() === 'catalogoskyleds');
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

  // Animaciones GSAP para los cards
  useEffect(() => {
    if (cardsContainerRef.current) {
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
      );
    }
  }, [paginatedList])

  return (
    <>
      <div className="w-full bg-white shadow-md p-4 flex flex-col mx-auto">
        <div className="px-4 sm:px-12 md:px-24 lg:px-48 text-center sm:text-left">
          <p className="py-2 text-pretty text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-700">
            Catalogo Sky Leds
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
          <div
            className="gap-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5"
            ref={cardsContainerRef}
          >
            {paginatedList.map((item, index) => (
              <Card
                key={index}
                isPressable
                onPress={() => navigate(`${item.ruta}`)}
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
    </>
  );
}
