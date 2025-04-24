import { useState } from 'react'
import { Field, Label, Switch } from '@headlessui/react'
import { motion } from 'framer-motion';
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = import.meta.env.VITE_API_URL + "/api/send-question";

export default function FormContact() {
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

    return (
        <>
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
                        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">¿Como podemos ayudarte?</h2>
                        <p className="mt-2 text-lg/8 text-gray-300">Por favor, completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20 px-4 sm:px-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1 md:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-white">
                                    Nombre
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-white">
                                    Apellido
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
                                    Correo
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-white">
                                    Número telefónico
                                </label>
                                <div className="mt-2.5">
                                    <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-cyan-500">
                                        <input
                                            id="phone-number"
                                            name="phone-number"
                                            type="number"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-700 placeholder:text-gray-400 focus:outline rounded-xl focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
                                    ¿Cuál es tu pregunta, comentario o problema?
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                            <Field className="flex gap-x-4 sm:col-span-2">
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
                                    <a href="#" className="font-semibold text-cyan-500">
                                        política&nbsp;de privacidad
                                    </a>
                                    .
                                </Label>
                            </Field>
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="block w-full rounded-md bg-cyan-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                    <ToastContainer
                        position="bottom-center"
                        autoclose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                        transition={Flip}
                    />
                </div>
            </motion.div>
        </>
    )
}
