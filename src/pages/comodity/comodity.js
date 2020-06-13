import React, { useState,useEffect,Suspense } from 'react';

import {
  useDispatch,
  useSelector,
} from '../../hooks/react_redux_hooks';
import { list_comodity } from '../../store/action_creator/comodity/list_data_comodity_action';

const ListTable = React.lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(import('./table_comodity')), 3000);
    });
});

function Comodity() {
  const dispatch = useDispatch()
  const [limit, setLimit] = useState(5);

  const list_data_comodity_state = useSelector(
    (state) => state.list_data_comodity_state
  );

  useEffect(() => {
    const fetchData = async () => {
        await dispatch(list_comodity())
    };
    fetchData();
  }, [dispatch, limit]);

  return (
    <div>
        <Suspense fallback={<div>loading</div>}>
            <ListTable data={list_data_comodity_state} limit={limit} />
        </Suspense>
    </div>
  );
}

export default Comodity;