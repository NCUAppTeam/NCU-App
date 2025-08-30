import { FaSearch, FaTimes } from 'react-icons/fa';

interface HeaderSearchBarProps {
    textInputValue: string;
    setTextInputValue: (value: string) => void;
    setShowSearchResults: (show: boolean) => void;
    showSearchResults: boolean;
    onSearch?: (searchTerm: string) => void; // Optional search callback
}

export default function HeaderSearchBar({
    textInputValue,
    setTextInputValue,
    setShowSearchResults,
    showSearchResults,
    onSearch,
}: HeaderSearchBarProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTextInputValue(value);
        setShowSearchResults(value.length > 0);

        // If onSearch callback exists, call it
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleCancelClick = () => {
        setTextInputValue('');
        setShowSearchResults(false);
    };

    return (
        <div className="bg-white rounded-full p-2 shadow-md flex items-center">
            <div className="text-gray-500 mx-2">
                <FaSearch />
            </div>

            <input
                type="text"
                value={textInputValue}
                onChange={handleInputChange}
                placeholder="搜尋校園地點..."
                className="flex-grow outline-none px-2"
                onFocus={() => {
                    if (textInputValue) {
                        setShowSearchResults(true);
                    }
                }}
            />

            {showSearchResults && (
                <button
                    onClick={handleCancelClick}
                    className="text-gray-600 mx-2"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
}
