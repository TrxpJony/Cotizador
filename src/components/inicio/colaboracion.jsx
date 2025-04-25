import logo1 from '../../img/img_Principal/1.png';
import logo2 from '../../img/img_Principal/2.png';
import logo3 from '../../img/img_Principal/3.png';
import logo4 from '../../img/img_Principal/4.png';
import logo5 from '../../img/img_Principal/5.png';
import logo6 from '../../img/img_Principal/6.png'
import '../../css/colosal.css'; // Archivo CSS para estilos


export function Colaboración() {

  return (
    <>
      <div className="bg-white  sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            En colaboración con
          </h2>
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            <a href="https://espejossas.com/" target="_blank" rel="noopener noreferrer">
              <img
                alt="Espejos SAS"
                src={logo1}
                width={158}
                height={48}
                className="col-span-2 max-h-40 w-full object-contain lg:col-span-1 cursor-pointer"
              />
            </a>
            <a href="https://www.vidrioandino.com" target='_blank' rel='noopener noreferrer'>
              <img
                alt="Vidrio Andino"
                src={logo2}
                width={158}
                height={48}
                className="col-span-2 max-h-40 w-full object-contain lg:col-span-1 cursor-pointer"
              />
            </a>
            <a href='https://linktr.ee/Acervid1' target='_blank' rel='noopener noreferrer'>
              <img
                alt="Sky Leds"
                src={logo3}
                width={158}
                height={48}
                className="col-span-2 max-h-40 w-full object-contain lg:col-span-1 cursor-pointer"
              />
            </a>
            <a href="https://vitral.com.co/" target='_blank' rel='noopener noreferrer'>
              <img
                alt="Vitral"
                src={logo4}
                width={158}
                height={48}
                className="col-span-2 max-h-40 w-full object-contain sm:col-start-2 lg:col-span-1 cursor-pointer"
              />
            </a>
            <a href="https://aluminark.com/" target='_black' rel='noopener noreferrer'>
              <img
                alt="Aluminark"
                src={logo5}
                width={158}
                height={48}
                className="col-span-2 max-h-40 w-full object-contain lg:col-span-1 cursor-pointer"
              />
            </a>
            <a href="https://vitelsa.com.co/" target='_black' rel='noopener noreferrer'>
              <img
                alt="Vitelsa"
                src={logo6}
                width={158}
                height={48}
                className="col-span-2 max-h-40 w-full object-contain sm:col-start-2 lg:col-span-1 cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
