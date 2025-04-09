import { AnyFieldApi } from '@tanstack/react-form';

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-red-500 text-sm mt-1">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating && (
                <p className="text-blue-500 text-sm mt-1">Trwa walidacja...</p>
            )}
        </>
    );

}

export default FieldInfo