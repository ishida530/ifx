import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ErrorHandlerProps {
    error: Error | null;
    children: React.ReactNode;
}

const ErrorHandler = ({ error, children }: ErrorHandlerProps) => {
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (error) {
            setHasError(true);
        }
    }, [error]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (hasError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-800 p-6">
                <div className="max-w-lg w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-lg p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                        Wystąpił błąd przy ładowaniu danych
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {error?.message || "Nie udało się załadować danych. Spróbuj ponownie później."}
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleGoBack}
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 cursor-pointer"
                        >
                            Wróć do poprzedniej strony
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200 cursor-pointer"
                        >
                            Przejdź do strony głównej
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ErrorHandler;
