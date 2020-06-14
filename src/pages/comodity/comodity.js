import React, { useEffect,Suspense } from 'react';
import Loading from '../../components/loading/is_loading'

import {
  useDispatch,
  useSelector,
} from '../../hooks/react_redux_hooks';
import { list_comodity } from '../../store/action_creator/comodity/list_data_comodity_action';
import { option_area } from '../../store/action_creator/comodity/option_city_comodity_action';
import { option_size } from '../../store/action_creator/comodity/option_size_comodity_action';

const ListTable = React.lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(import('./table_comodity')), 3000);
    });
});

function Comodity() {
  const dispatch = useDispatch()

  const list_data_comodity_state = useSelector(
    (state) => state.list_data_comodity_state
  );

  const list_option_area_state = useSelector(
    (state) => state.option_area_state
  );

  const list_option_size_state = useSelector(
    (state) => state.option_size_state
  );

  useEffect(() => {
    const fetchData = async () => {
       const res = await dispatch(list_comodity())
       const area = await dispatch(option_area())
       const size = await dispatch(option_size())
       console.log(res)
       console.log(area)
       console.log(size)
    };
    fetchData();
    
  }, ([dispatch]));

  return (
    <div>
        <Suspense fallback={<Loading/>}>
            <ListTable data={list_data_comodity_state}/>
        </Suspense>
    </div>
  );
}

export default Comodity;