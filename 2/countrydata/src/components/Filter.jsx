const Filter = ({ searchInput, onSearchChange }) => {
    return (
        <div>
            find countries
            <input value={searchInput} onChange={onSearchChange} />
        </div>
    );
};

export default Filter