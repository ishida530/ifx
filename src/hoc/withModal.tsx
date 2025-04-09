import { useState } from 'react';

const withModal = <P extends object>(Component: React.ComponentType<P>) => {
    return function ModalWrapper(props: P) {
        const [isOpen, setIsOpen] = useState(false);

        const openModal = () => setIsOpen(true);
        const closeModal = () => setIsOpen(false);

        return (
            <>
                <button
                    onClick={openModal}
                    className=" px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    Dodaj nowy post
                </button>

                {isOpen && (
                    <div className="fixed inset-0 bg-white bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex justify-center items-center transition-all duration-300 ease-in-out">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full transform transition-all duration-300 ease-in-out">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-2xl text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                            >
                                &times;
                            </button>
                            <Component {...props} closeModal={closeModal} />
                        </div>
                    </div>
                )}
            </>
        );
    };
};

export default withModal;
