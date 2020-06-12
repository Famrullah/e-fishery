import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from '../../hooks/react_redux_hooks';
import { list_comodity } from '../../store/action_creator/comodity/list_data_comodity_action';

function Comodity() {
  const dispatch = useDispatch();
  const { data, isError, messages } = useSelector(
    (state) => state.list_data_comodity_state
  );

  useEffect(() => {
    const fetchData = (people) => {
      dispatch(list_comodity(1))
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      test aja
    </div>
  );
}

export default Comodity;