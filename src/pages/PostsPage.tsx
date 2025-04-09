import { useState } from 'react';
import PostList from '../features/post/PostList';
import useAddPost from '../features/post/hooks/useAddPost';
import PostForm from '../features/post/PostForm';
import withModal from '../hoc/withModal';

const PostsPage = () => {
    const { mutate: addPost } = useAddPost();
    const [isGlobalLoading, setIsGlobalLoading] = useState(false);

    const ModalPostForm = withModal(PostForm);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Lista postów</h2>
            </div>

            <ModalPostForm
                addPost={addPost}
                setIsGlobalLoading={setIsGlobalLoading}
            />

            {isGlobalLoading ? (
                <div className="flex justify-center mt-4">
                    <h3 className="text-xl text-blue-500">Trwa ładowanie listy...</h3>
                </div>
            ) : (
                <div className="mt-6">
                    <PostList />
                </div>
            )}
        </div>
    );
};

export default PostsPage;
