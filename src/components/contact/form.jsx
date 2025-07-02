import { useLayoutEffect, useRef, useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'
import { motion } from 'framer-motion';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimationFormContact } from '../../utils/homeAnimation/gsapAnimationNosotros';
import gsap from 'gsap';

const baseUrl = import.meta.env.VITE_API_URL + "/api/send-question";

export default function FormContact() {
    const containerRef = useRef(null);
    const [agreed, setAgreed] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            nombre: formData.get("first-name")?.trim(),
            apellido: formData.get("last-name")?.trim(),
            email: formData.get("email")?.trim(),
            telefono: formData.get("phone-number")?.trim(),
            mensaje: formData.get("message")?.trim(),
        };

        // --- Validaciones ---

        // 1. Todos los campos deben estar llenos
        if (!data.nombre || !data.apellido || !data.email || !data.telefono || !data.mensaje) {
            toast.warn("Por favor, completa todos los campos.");
            return;
        }

        // 2. Nombre y apellido solo con letras y espacios
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nombreRegex.test(data.nombre)) {
            toast.warn("El nombre solo debe contener letras.");
            return;
        }

        if (!nombreRegex.test(data.apellido)) {
            toast.warn("El apellido solo debe contener letras.");
            return;
        }

        // 3. Email válido (formato básico)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            toast.warn("El correo electrónico no es válido.");
            return;
        }

        // 4. Teléfono: exactamente 10 dígitos
        const telefonoRegex = /^\d{10}$/;
        if (!telefonoRegex.test(data.telefono)) {
            toast.warn("El número telefónico debe tener exactamente 10 dígitos.");
            return;
        }

        // 5. Mensaje mínimo 10 caracteres, máximo 3000
        if (data.mensaje.length < 10) {
            toast.warn("El mensaje debe tener al menos 10 caracteres.");
            return;
        }
        if (data.mensaje.length > 3000) {
            toast.warn("El mensaje no puede tener más de 3000 caracteres.");
            return;
        }

        // 6. Aceptar la política de privacidad
        if (!agreed) {
            toast.info("Debes aceptar la política de privacidad.");
            return;
        }

        // --- Enviar formulario ---
        try {
            const response = await toast.promise(
                fetch(baseUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }),
                {
                    pending: "Enviando mensaje...",
                    success: "Tu mensaje fue enviado con éxito. Pronto te contactaremos.",
                    error: "Hubo un problema al enviar tu mensaje.",
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido");
            }

            e.target.reset();
            setAgreed(false); // opcional: resetear el switch

        } catch (err) {
            console.error("Error enviando mensaje:", err);
            // Ya se mostró un toast con el error arriba
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            AnimationFormContact(containerRef.current);
        }, containerRef);
        return () => ctx.revert();
    }, []);


    return (
        <>
            <div ref={containerRef}>
                <motion.div
                    className="min-h-screen relative isolate overflow-hidden py-24 sm:py-36 text-center"
                    style={{
                        background: "linear-gradient(90deg, #22d3ee, #0891b2, #9ca3af, #374151, #374151, #9ca3af, #0891b2, #22d3ee, #0891b2)",
                        backgroundSize: "800% 800%", // Movimiento más fluido
                    }}
                    animate={{
                        backgroundPosition: [
                            "0% 50%", "25% 50%", "50% 50%", "75% 50%", "100% 50%"
                        ],
                    }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    <div className="px-4 sm:px-6 lg:px-8"> {/* Added padding for responsiveness */}

                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                        >
                            <div />
                        </div>
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="form-contact-text text-balance text-4xl info-contact-title font-extrabold  tracking-tight text-white sm:text-5xl">¿Como podemos ayudarte?</h2>
                            <p className="form-contact-text mt-2 text-lg/8 text-gray-300">Por favor, completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20 px-4 sm:px-6">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-2">
                                <div>
                                    <label htmlFor="first-name" className="form-contact-label block text-sm/6 font-semibold text-white">
                                        Nombre
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            autoComplete="given-name"
                                            className="form-contact-inputs block w-full rounded-2xl bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="form-contact-label block text-sm/6 font-semibold text-white">
                                        Apellido
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="last-name"
                                            name="last-name"
                                            type="text"
                                            autoComplete="family-name"
                                            className="form-contact-inputs block w-full rounded-2xl bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="form-contact-label block text-sm/6 font-semibold text-white">
                                        Correo
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="form-contact-inputs block w-full rounded-2xl bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="phone-number" className="form-contact-label block text-sm/6 font-semibold text-white">
                                        Número telefónico
                                    </label>
                                    <div className="mt-2.5">
                                        <div className="form-contact-inputs flex rounded-2xl bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-cyan-500">
                                            <input
                                                id="phone-number"
                                                name="phone-number"
                                                type="number"
                                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-700 placeholder:text-gray-400 focus:outline rounded-2xl focus:outline-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="form-contact-label block text-sm/6 font-semibold text-white">
                                        ¿Cuál es tu pregunta, comentario o problema?
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="form-contact-inputs block w-full rounded-2xl bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <Field className="form-contact-inputs flex gap-x-4 sm:col-span-2">
                                    <div className="flex h-6 items-center">
                                        <Switch
                                            checked={agreed}
                                            onChange={setAgreed}
                                            className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 data-[checked]:bg-cyan-500"
                                        >
                                            <span className="sr-only">Agree to policies</span>
                                            <span
                                                aria-hidden="true"
                                                className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                                            />
                                        </Switch>
                                    </div>
                                    <Label className="text-sm/6 text-gray-300">
                                        Al seleccionar esto, aceptas nuestra{' '}
                                        <a href="#" className="font-semibold text-white">
                                            política&nbsp;de privacidad
                                        </a>
                                        .
                                    </Label>
                                </Field>
                            </div>
                            <div className="form-contact-button mt-10">
                                <button
                                    type="submit"
                                    className="block w-full rounded-2xl border border-white bg-transparent-500 px-3.5 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-cyan-500 hover:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 transition-colors"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
