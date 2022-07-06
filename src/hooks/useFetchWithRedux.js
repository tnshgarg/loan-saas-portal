import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const useFetchWithRedux = ( fetchDataAction, selector ) => {
  const dispatch = useDispatch();
  const selectedState = useSelector(selector, shallowEqual);

  console.log({selectedState})

  useEffect(() => {
    if (!selectedState || !Object.keys(selectedState).length) {
      console.log(fetchDataAction)
      dispatch(fetchDataAction());
    }
  }, [dispatch, fetchDataAction, selectedState]);

  return selectedState;
};

export default useFetchWithRedux;
