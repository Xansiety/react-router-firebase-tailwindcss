import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

export const NavBar = () => {
  const { user, logOutFirebase } = useUserContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutFirebase();
  };

  const goToRegister = () => {
    navigate("/auth/register");
  };

  return (
    <>
      <nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="#" className="flex items-center">
            <img
              src="https://cdn2.iconfinder.com/data/icons/generic-03/100/Artboard_186-512.png"
              className="h-6 mr-3 sm:h-10"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              My Personal URL's
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex  items-center  flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                      aria-current="page"
                    >
                      Inicio
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/perfil"
                      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                      aria-current="page"
                    >
                      Mi Perfil
                    </NavLink>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogOut}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Salir
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/auth/login"
                      className={({ isActive }) =>
                      `text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                      nav-item nav-link ${isActive ? "active" : ""}`
                      }
                    >
                      Login
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/auth/register"
                      className={({ isActive }) =>
                        `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 nav-item nav-link ${isActive ? "active" : ""}`
                      } 
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
