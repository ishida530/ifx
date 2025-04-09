import { useParams, useNavigate } from 'react-router-dom';
import useGetPostDetails from './hooks/useGetPostDetails';
import ErrorHandler from '../../components/ErrorHandler';

const PostDetails = () => {
    const { id: postId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { post, user, error, isLoading } = useGetPostDetails(Number(postId));

    if (isLoading) {
        return <div>Ładowanie danych...</div>;
    }

    if (error) {
        return <div>Wystąpił błąd podczas ładowania danych: {error.message}</div>;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <ErrorHandler error={error}>
            <div className="p-4">
                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    Wróć do listy
                </button>

                {!post || !user ? (
                    <div>Nie znaleziono posta lub użytkownika.</div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            {post.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Autor:</h3>
                            <p className="text-gray-700 dark:text-gray-300">{user.name}</p>
                            <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
                        </div>
                    </>
                )}
            </div>
        </ErrorHandler>
    );
};

export default PostDetails;
