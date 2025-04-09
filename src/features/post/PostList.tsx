import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import useGetPostsAndUsers from './hooks/useGetPostsAndUsers';

type PostWithUserType = {
    id: number;
    title: string;
    body: string;
    userId: number;
    user?: { name: string; email: string };
};

const PostList = () => {
    const { posts, users, error, isLoading } = useGetPostsAndUsers();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const data: PostWithUserType[] = useMemo(() => {
        const userMap = new Map(users.map(user => [user.id, user]));
        const query = searchQuery.toLowerCase();

        const filteredPosts = posts
            .map(post => ({
                ...post,
                user: userMap.get(post.userId),
            }))
            .filter(post => {
                return (
                    (post.title && post.title.toLowerCase().includes(query)) ||
                    (post.user?.name && post.user.name.toLowerCase().includes(query)) ||
                    (post.user?.email && post.user.email.toLowerCase().includes(query))
                );
            });

        return filteredPosts;
    }, [posts, users, searchQuery]);

    const columns = useMemo<ColumnDef<PostWithUserType>[]>(() => [
        {
            header: 'Tytuł',
            accessorKey: 'title',
        },
        {
            header: 'Autor',
            accessorFn: row => row.user?.name ?? 'Nieznany',
            id: 'userName',
        },
        {
            header: 'E-mail',
            accessorFn: row => row.user?.email ?? '',
            id: 'userEmail',
        },
        {
            header: 'Szczegóły',
            cell: ({ row }) => (
                <Link to={`/posts/${row.original.id}`} className="text-blue-600 dark:text-blue-400 underline">
                    Zobacz
                </Link>
            ),
        },
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil(data.length / 10),
    });

    if (isLoading) return <div>Ładowanie danych...</div>;

    if (error) return <div>Coś poszło nie tak ...</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Lista postów (TanStack Table)</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Wyszukaj po tytule, autorze lub e-mailu..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="border px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border px-4 py-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
                    disabled={!table.getCanPreviousPage()}
                    className=" px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    Poprzednia
                </button>
                <span>
                    Strona{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
                    </strong>
                </span>
                <button
                    onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-4 py-2 border border-gray-700 dark:bg-gray-800  text-gray-900 dark:text-gray-200 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    Następna
                </button>
            </div>
        </div>
    );
};

export default PostList;
