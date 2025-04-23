import { useDispatch } from "react-redux";
import { changeFilterTo } from "../reducers/filterReducer";

const FilterInput = () => {
    const dispatch = useDispatch()

  const changeFilter = (e) => {
    dispatch(changeFilterTo(e.target.value));
  };
  return (
    <div>
      filter <input type='text' onChange={changeFilter}></input>
    </div>
  );
};

export default FilterInput;
