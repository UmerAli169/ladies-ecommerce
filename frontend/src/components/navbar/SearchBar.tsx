import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsSearchActive: (active: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, setIsSearchActive }) => {
  return (
    <div className="flex justify-center py-[16px]">
      <div className="flex items-center bg-[#DBDBEA] gap-2 border-gray-300 rounded-lg px-2 py-1 w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchActive(e.target.value.length > 0); // Show search bar when text is entered
          }}
          placeholder="Search"
          className="w-full outline-none text-sm bg-[#DBDBEA] text-gray-700 py-[15px]"
        />
        <div
          className="w-[14px] mr-[15px] filter brightness-0 cursor-pointer"
          onClick={() => {
            setSearchQuery(""); // Clear search
            setIsSearchActive(false); // Hide search bar
          }}
        >
          <img src="/svgs/Shared/cross/cross.svg" alt="Close" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
