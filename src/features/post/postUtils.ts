

export const resetForm = (setTitle: React.Dispatch<React.SetStateAction<string>>, setBody: React.Dispatch<React.SetStateAction<string>>, setUserId: React.Dispatch<React.SetStateAction<number>>, userId: number) => {
    setTitle('');
    setBody('');
    setUserId(userId);
};
