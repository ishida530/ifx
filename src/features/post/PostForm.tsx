import { useForm } from '@tanstack/react-form';
import { PostType } from './types';
import { sampleUser } from '../../utils/utils';
import FieldInfo from '../../components/FieldInfo';

export interface PostFormProps {
    addPost: (newPost: PostType) => void;
    setIsGlobalLoading: (isLoading: boolean) => void;
    closeModal?: () => void;
}

const PostForm = ({ addPost, setIsGlobalLoading, closeModal }: PostFormProps) => {
    const form = useForm({
        defaultValues: {
            title: '',
            body: ''
        },
        onSubmit: async ({ value }) => {
            console.log('value', value);
            setIsGlobalLoading(true);
            const newPost: PostType = {
                id: Date.now(),
                title: value.title,
                body: value.body,
                userId: sampleUser.id
            };
            console.log('newPost', newPost);

            addPost(newPost);
            form.reset();
            setIsGlobalLoading(false);
            if (closeModal) {
                closeModal();
            }
        },
    });

    return (
        <div className="space-y-6 dark:bg-gray-900 text-gray-900  dark:text-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900">Stwórz nowy post</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <label htmlFor="title" className="text-lg text-gray-900 dark:text-gray-200">Tytuł:</label>
                    <form.Field
                        name="title"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'Tytuł jest wymagany'
                                    : value.length < 3
                                        ? 'Tytuł musi mieć co najmniej 3 znaki'
                                        : undefined,
                        }}
                        children={(field) => (
                            <div>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="body" className="text-lg text-gray-900 dark:text-gray-200">Treść:</label>
                    <form.Field
                        name="body"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'Treść jest wymagana'
                                    : value.length < 10
                                        ? 'Treść musi mieć co najmniej 10 znaków'
                                        : undefined,
                        }}
                        children={(field) => (
                            <div>
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                </div>

                <div className="flex justify-between space-x-4">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <>
                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className="w-full px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {isSubmitting ? 'Dodawanie...' : 'Dodaj post'}
                                </button>

                                <button
                                    type="reset"
                                    onClick={() => form.reset()}
                                    className="w-full px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    Resetuj
                                </button>
                            </>
                        )}
                    />
                </div>
            </form>
        </div>
    );
};

export default PostForm;
