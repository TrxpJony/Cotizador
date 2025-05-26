import { useLayoutEffect, useRef } from 'react';
import '../../css/direccion.css';
import { GoogleMapAnimations } from '../../utils/homeAnimation/gsapAnimationNosotros';
import gsap from 'gsap';

const GoogleMap = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      GoogleMapAnimations(containerRef.current); // <-- pasa  la referencia aqui
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="map-container google-map ">
        <iframe
          title="google map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.463830009868!2d-74.1036491453782!3d4.689169599253737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b002817efb9%3A0x7e46a7ff67e87224!2sVidrio%20al%20Arte%20-%20Oficinas!5e0!3m2!1sen!2sma!4v1741187602729!5m2!1sen!2sma"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;