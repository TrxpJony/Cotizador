import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@nextui-org/react";

const baseUrl = 'https://api-cotizador.vercel.app/Productos';

export function Productos() {
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
          setList(data);
          setFilteredList(data);
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

  // Calcula los elementos visibles según la página actual
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <br />
      <div className="filter-frame">
        <br />
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
          Productos
        </p>
        <br />
        <div className="flex justify-between items-center">
          {/* Barra de búsqueda */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => filterBySearchTerm(e.target.value)}
            placeholder="Buscar Categoria"
            className="peer block w-80 border-b-2 border-gray-400 bg-transparent px-3 py-2 outline-none focus:border-cyan-500 focus:ring-0 focus:placeholder-opacity-0 dark:text-white dark:placeholder:text-neutral-300 dark:focus:border-cyan-500"
          />

          {/* Componente de paginación */}

          <Pagination
            className="text-right"
            initialPage={1}
            page={currentPage} // Sincroniza el estado de la página con el componente
            total={Math.ceil(filteredList.length / itemsPerPage)}
            onChange={(page) => setCurrentPage(page)}
            color="primary"
          />
        </div>
      </div>
      <br />
      <div className="card-frame">
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
          {paginatedList.map((item, index) => (
            <Card
              key={index}
              isPressable
              shadow="sm"
              onPress={() => navigate(`/${item.id}`)} // Update the navigation path
              className="nextui-card"
            >
              <CardBody className="overflow-hidden p-4">
                <Image
                  alt={item.title}
                  className="w-full object-cover h-[200px] rounded-t-lg"
                  radius="lg"
                  shadow="sm"
                  src={item.img}
                  width="100%"
                  height="250px"
                />
              </CardBody>
              <CardFooter className="text-small justify-between p-2">
                <b>{item.title}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <br />
    </>
  );
}
