import { ChangeEvent } from 'react';

interface ImageUploaderProps {
    /** Callback function that receives an array of selected File objects. */
    onFilesSelected: (files: File[]) => void;
    /** Whether the input should be disabled. */
    disabled?: boolean;
}

export default function ImageUploader({ onFilesSelected, disabled }: ImageUploaderProps) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // Convert FileList to Array and pass to parent
            onFilesSelected(Array.from(event.target.files));
            // Reset the input value to allow selecting the same file(s) again if needed
            event.target.value = '';
        }
    };

    return (
        <input
            type="file"
            multiple // Allow multiple file selection
            accept="image/*" // Accept only image files
            onChange={handleFileChange}
            disabled={disabled}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 mb-2 cursor-pointer"
        />
    );
}