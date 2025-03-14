import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Field, Label, Switch } from '@headlessui/react'
import { motion } from 'framer-motion';

export default function FormContact() {
    const [agreed, setAgreed] = useState(false)

    return (
        <>
            <motion.div
                className="relative isolate overflow-hidden py-24 sm:py-32 text-center"
                style={{
                    background: "linear-gradient(90deg, #22d3ee, #0891b2, #9ca3af, #374151, #374151, #9ca3af, #0891b2, #22d3ee, #0891b2)",
                    backgroundSize: "800% 800%", // Movimiento más fluido
                }}
                animate={{
                    backgroundPosition: [
                        "0% 50%", "25% 50%", "50% 50%", "75% 50%", "100% 50%",
                    ],
                }}
                transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                <div className="">

                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    >
                        <div

                        />
                    </div>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">¿Como podemos ayudarte?</h2>
                        <p className="mt-2 text-lg/8 text-gray-300">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
                    </div>
                    <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
                                        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country"
                                                aria-label="Country"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6"
                                            >
                                                <option>US</option>
                                                <option>CA</option>
                                                <option>EU</option>
                                            </select>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                        </div>
                                        <input
                                            id="phone-number"
                                            name="phone-number"
                                            type="text"
                                            placeholder="123-456-7890"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-700 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
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
                                    By selecting this, you agree to our{' '}
                                    <a href="#" className="font-semibold text-cyan-500">
                                        privacy&nbsp;policy
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
                                Lets talk
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    )
}
