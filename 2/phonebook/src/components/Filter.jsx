const Filter = ({ onChange, searchFilter }) => {
    return (
        <div>
            filter shown with <input onChange={onChange} value={searchFilter} />
        </div>
    );
};

export default Filter