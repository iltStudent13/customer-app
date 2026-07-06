interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name, email, or city..."
        className="px-3 py-2 border rounded-md"
      />
    </div>
  );
};

export default SearchFilter;
