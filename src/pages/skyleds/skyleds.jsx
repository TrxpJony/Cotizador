import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@nextui-org/react";

const baseUrl = import.meta.env.VITE_API_URL + "/api/categorias";

export function CatalogoSkylesd() {
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
          const categoriaData = data.filter(item => item.categoria?.toLowerCase() === 'catalogoskyleds');
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
          Catalogo SKYLEDS
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
              className="text-right mx-2"
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
              onPress={() => navigate(`/${item.id}`)}
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
              <CardFooter className="text-small justify-between p-2">
                <b>{item.title}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Botón Regresar */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-cyan-500 text-white py-2 px-4 rounded-lg font-bold text-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Regresar
          </button>
        </div>
        <br />
        <div className="flex items-center ">
          <Pagination showControls
            className="text-right mx-2"
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
