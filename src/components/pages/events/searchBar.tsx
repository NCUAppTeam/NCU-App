import { Search } from "flowbite-react-icons/outline";
import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder = '請輸入關鍵字' }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <div className="search-bar mb-2 relative xl:mt-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder={isFocused ? placeholder : ''}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="input input-bordered w-full pl-3 pr-12"
                />
                {!searchTerm && !isFocused && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-gray-400">搜尋</span>
                    </div>
                )}
                {searchTerm && (
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setSearchTerm('')}
                    >
                        清除
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;