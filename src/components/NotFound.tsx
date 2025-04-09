import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <h2 className="text-3xl font-semibold mb-4">404 - Strona nieznaleziona</h2>
            <Link
                to="/"
                className="px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                Wróć do strony głównej
            </Link>
        </div>
    );
};

export default NotFound;
