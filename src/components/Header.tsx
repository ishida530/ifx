import { FaMoon, FaSun } from 'react-icons/fa';
import useToggleDarkMode from '../hooks/useToggleDarkMode';

const Header = () => {
    const { toggleDarkMode } = useToggleDarkMode();

    return (
        <header className="static left-0 right-0  top-0 z-50 w-fulltransition-colors border-b border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end items-center">
                <button
                    onClick={toggleDarkMode}
                    className="w-10 h-10 flex justify-center items-center rounded-full 
            bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-amber-500 dark:text-neutral-950 dark:hover:bg-neutral-200 
            shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                    <FaMoon className="text-lg dark:hidden" />
                    <FaSun className="text-lg hidden dark:block" />
                </button>
            </div>
        </header>
    );
};

export default Header;
