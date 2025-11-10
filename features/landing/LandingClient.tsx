"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

export default function SaveatLandingPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navRef = useRef<HTMLDivElement>(null);
  const navToggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        navToggleRef.current &&
        !navToggleRef.current.contains(target)
      ) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const headerClasses = `fixed w-full z-30 top-0 transition-all duration-300 ease-in-out ${
    isHeaderScrolled ? "bg-white text-gray-800 shadow-lg" : "text-white"
  }`;

  const logoClasses = `no-underline hover:no-underline font-bold text-2xl lg:text-4xl ${
    isHeaderScrolled ? "text-gray-800" : "text-white"
  }`;

  const navLinkClasses = `inline-block py-2 px-4 no-underline ${
    isHeaderScrolled
      ? "text-gray-800 hover:text-green-700"
      : "text-white hover:text-gray-200"
  }`;

  const navActionClasses = `mx-auto lg:mx-0 font-bold rounded-full mt-4 lg:mt-0 py-3 px-6 shadow focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ${
    isHeaderScrolled
      ? "bg-gradient-to-r from-emerald-700 to-green-900 text-white hover:underline"
      : "bg-white text-gray-800 hover:underline"
  }`;

  const loginClasses = `inline-block py-2 px-4 no-underline font-medium ${
    isHeaderScrolled
      ? "text-gray-600 hover:text-green-700"
      : "text-white hover:text-gray-200"
  }`;

  const mobileMenuClasses = `w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 p-4 lg:p-0 z-20 ${
    isNavOpen ? "block" : "hidden"
  } ${isHeaderScrolled ? "bg-white" : "bg-transparent"}`;

  return (
    <div className="leading-normal tracking-normal text-white bg-linear-to-r from-emerald-700 to-green-900">
      <nav id="header" className={headerClasses}>
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <Link className={logoClasses} href="/">
              <svg
                className="h-8 fill-current inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3.5a1.5 1.5 0 0 1 3 0V5h3a1.5 1.5 0 0 1 0 3H13v1.5a1.5 1.5 0 0 1-3 0V8H7a1.5 1.5 0 0 1 0-3h3V3.5zM1.5 9.5A1.5 1.5 0 0 0 0 11v5a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 8 16V11a1.5 1.5 0 0 0-1.5-1.5h-5zM12 9.5A1.5 1.5 0 0 0 10.5 11v5A1.5 1.5 0 0 0 12 17.5h5A1.5 1.5 0 0 0 18.5 16V11a1.5 1.5 0 0 0-1.5-1.5h-5z" />
                <path
                  fillRule="evenodd"
                  d="M9.669 2.228C10.462 1.25 11.7 1.018 12.63 1.585c1.112.678 1.63 2.12 1.34 3.346l-.16.697A6.5 6.5 0 0 1 9.6 10.153l.003-.004A6.5 6.5 0 0 1 4.148 3.5c.664-1.258 2.07-1.953 3.498-1.953l.002.001c.78 0 1.516.3 2.02.854l.001.002.001.002.001.001.001.001zM11 5.5a5 5 0 1 0-5.022 4.99L6 10.5H4.15a5.002 5.002 0 0 0 4.138-4.155c.29-.68.254-1.424.11-2.122A5.002 5.002 0 0 0 11 5.5z"
                  clipRule="evenodd"
                />
              </svg>
              Saveat
            </Link>
          </div>

          <div className="block lg:hidden pr-4" ref={navToggleRef}>
            <button
              id="nav-toggle"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="flex items-center p-1 text-white hover:text-gray-300 focus:outline-none focus:shadow-outline"
            >
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <div className={mobileMenuClasses} id="nav-content" ref={navRef}>
            <ul className="list-none lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a className={navLinkClasses} href="#como-funciona">
                  Cómo funciona
                </a>
              </li>
              <li className="mr-3">
                <a className={loginClasses} href="/login">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
            <a href="/register">
              <button id="navAction" className={navActionClasses}>
                Crear una Cuenta
              </button>
            </a>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>

      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">
              El banco de alimentos digital
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Rescata alimentos, combate el desperdicio.
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Únete a nuestra comunidad y obtén productos de alta calidad a un
              precio increíble, ayudando al planeta.
            </p>
            <a href="/tienda" className="mx-auto lg:mx-0">
              <button className="hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Explorar Productos
              </button>
            </a>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <Image
              className="w-full md:w-4/5 z-50 rounded-lg"
              src="https://placehold.co/600x400/a3e635/14532d?text=Saveat"
              alt="Platillo de comida rescatada"
            />
          </div>
        </div>
      </div>

      <div className="relative -mt-12 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>

      <section id="como-funciona" className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            ¿Cómo Funciona?
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-linear-to-r from-emerald-700 to-green-900 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Para Empresas (Donadores)
              </h3>
              <p className="text-gray-600 mb-8">
                ¿Tu empresa genera mermas o excedentes de alimentos? No dejes
                que se desperdicien. Con Saveat, puedes donar esos productos de
                forma fácil y eficiente.
                <br />
                <br />
                Nos encargamos de la logística para que tus excedentes lleguen a
                personas que los valoran, mejorando tu impacto social y
                reduciendo el desperdicio.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <Image
                className="w-full sm:h-64 mx-auto rounded-lg"
                src="https://placehold.co/600x400/86efac/166534?text=Empresas+Donadoras"
                alt="Empresas donando"
              />
            </div>
          </div>
          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <Image
                className="w-5/6 sm:h-64 mx-auto rounded-lg"
                src="https://placehold.co/600x400/bbf7d0/166534?text=Comunidad+Saveat"
                alt="Comunidad comprando"
              />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Para la Comunidad (¡Tú!)
                </h3>
                <p className="text-gray-600 mb-8">
                  Regístrate gratis y accede a una tienda llena de productos de
                  alta calidad (frutas, verduras, lácteos y más) a precios que
                  no podrás creer.
                  <br />
                  <br />
                  Cada compra que haces es un doble impacto: ahorras dinero en
                  tu despensa y ayudas a salvar al planeta del desperdicio de
                  alimentos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Nuestros Pilares
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-linear-to-r from-emerald-700 to-green-900 w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col grow shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <div className="flex flex-wrap no-underline hover:no-underline">
                <div className="w-full font-bold text-xl text-gray-800 px-6 pt-6">
                  Ahorro
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Accede a alimentos en perfecto estado por una fracción de su
                  costo original. Comer bien no tiene por qué ser caro.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col grow shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <div className="flex flex-wrap no-underline hover:no-underline">
                <div className="w-full font-bold text-xl text-gray-800 px-6 pt-6">
                  Comunidad
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Conectamos empresas con excedentes y personas que buscan
                  calidad y ahorro. Juntos creamos un círculo virtuoso.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-6 flex flex-col grow shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
              <div className="flex flex-wrap no-underline hover:no-underline">
                <div className="w-full font-bold text-xl text-gray-800 px-6 pt-6">
                  Planeta
                </div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Cada producto que rescatas es un golpe contra el desperdicio
                  de alimentos y la contaminación que este genera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <svg
        className="wave-top"
        viewBox="0 0 1439 147"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill="#f8fafc">
              <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  opacity="0.200000003"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <section className="container mx-auto text-center py-6 mb-12">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
          ¿Listo para hacer un cambio?
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <h3 className="my-4 text-3xl leading-tight">
          Únete a Saveat y sé parte de la solución.
        </h3>
        <a href="/register">
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            ¡Crear una Cuenta!
          </button>
        </a>
      </section>

      <footer className="bg-white text-gray-800">
        <div className="container mx-auto px-8">
          <div className="w-full flex flex-col md:flex-row py-6">
            <div className="flex-1 mb-6">
              <Link
                className="text-gray-800 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                href="/"
              >
                <svg
                  className="h-8 fill-current inline text-green-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3.5a1.5 1.5 0 0 1 3 0V5h3a1.5 1.5 0 0 1 0 3H13v1.5a1.5 1.5 0 0 1-3 0V8H7a1.5 1.5 0 0 1 0-3h3V3.5zM1.5 9.5A1.5 1.5 0 0 0 0 11v5a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 8 16V11a1.5 1.5 0 0 0-1.5-1.5h-5zM12 9.5A1.5 1.5 0 0 0 10.5 11v5A1.5 1.5 0 0 0 12 17.5h5A1.5 1.5 0 0 0 18.5 16V11a1.5 1.5 0 0 0-1.5-1.5h-5z" />
                  <path
                    fillRule="evenodd"
                    d="M9.669 2.228C10.462 1.25 11.7 1.018 12.63 1.585c1.112.678 1.63 2.12 1.34 3.346l-.16.697A6.5 6.5 0 0 1 9.6 10.153l.003-.004A6.5 6.5 0 0 1 4.148 3.5c.664-1.258 2.07-1.953 3.498-1.953l.002.001c.78 0 1.516.3 2.02.854l.001.002.001.002.001.001.001.001zM11 5.5a5 5 0 1 0-5.022 4.99L6 10.5H4.15a5.002 5.002 0 0 0 4.138-4.155c.29-.68.254-1.424.11-2.122A5.002 5.002 0 0 0 11 5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Saveat
              </Link>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Enlaces</p>
              <ul className="list-none mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    FAQ
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    Ayuda
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    Soporte
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Legal</p>
              <ul className="list-none mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    Términos
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <p className="uppercase text-gray-500 md:mb-6">Social</p>
              <ul className="list-none mb-6">
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    Facebook
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    Instagram
                  </a>
                </li>
                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a
                    href="#"
                    className="no-underline hover:underline text-gray-800 hover:text-green-700"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
