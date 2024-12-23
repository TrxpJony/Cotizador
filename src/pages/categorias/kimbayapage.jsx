import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const baseUrl = 'http://localhost:3001/vidrio';

export function Kimbayapage() {
  const [filteredList, setFilteredList] = useState([]); // Solo mantenemos el estado para la lista filtrada
  const navigate = useNavigate();  // Inicializa el hook para la navegación

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de la API:", data);  // Muestra los datos de la API en la consola
        // Filtrar los vidrios con categoría 'colosalpc26'
        const filteredData = data.filter(item => item.categoria === 'kimbaya');
        console.log("Datos filtrados:", filteredData);  // Muestra los datos después del filtro
        setFilteredList(filteredData); // Inicializa la lista filtrada con los datos filtrados
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // El array vacío asegura que la solicitud solo se haga una vez

  return (
    <>
    <br />
    <div className="filter-frame-page">
      <div className="flex justify-between items-center">
        <strong>
          <h1 className="text-[1.8em] text-[#00bcd4] mt-2">KIMBAYA TIPOLOGÍAS</h1>
        </strong>
      </div>
    </div>

    <br />
    <div className="card-frame">
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-5">
        {filteredList.map((item, index) => (
          <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => navigate(`${item.id}`)}  // Redirige usando el ID
          className="nextui-card"
        >
          <CardBody className="overflow-hidden p-4">
            <Image
              alt={item.title}
              className="w-full object-cover h-[200px] rounded-t-lg"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"  // Esto asegura que la imagen se ajuste al ancho completo del contenedor
              height="200px"  // Establece una altura fija para todas las imágenes
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500" >{item.tipo}</p>
          </CardFooter>
        </Card>
        
        ))}
        
      </div>
      <br />
      {/* Botón para regresar */}
      <button 
          onClick={() => navigate(-1)} 
          className="bg-cyan-500 text-white py-2 px-4 rounded-lg font-bold text-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Regresar
         </button>
    </div>
    <br />
    </>
  );
}
