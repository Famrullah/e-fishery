import React, { useEffect,useState,Suspense } from 'react';
import Loading from '../../components/loading/is_loading';
import {
  useDispatch,
  useSelector,
} from '../../hooks/react_redux_hooks';
import { list_comodity } from '../../store/action_creator/comodity/list_data_comodity_action';
import { option_area } from '../../store/action_creator/comodity/option_city_comodity_action';
import { option_size } from '../../store/action_creator/comodity/option_size_comodity_action';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: theme.spacing(5),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ListTable = React.lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(import('./table_comodity')), 3000);
    });
});

function Comodity() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const list_data_comodity_state = useSelector(
    (state) => state.list_data_comodity_state
  );

  const list_option_area_state = useSelector(
    (state) => state.option_area_state
  );

  const list_option_size_state = useSelector(
    (state) => state.option_size_state
  );
  const [data, setData] = useState([]);

  const [formValue,setFormValue] = useState({
    uuid:'',
    komoditas:'',
    provinsi:'',
    kota:'',
    harga:'',
    ukuran:''
  })
  const [showModal, setShowModal] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)

  const toggleModal = (row) => {
    setShowModal(!showModal)
    console.log(showModal)
  }
  const toggleSuccess = (row) => {
    setSuccessAlert(!successAlert)
  }
  
  const handleForm = (e) =>{
    setFormValue({
      ...formValue,
      [e.target.name]:e.target.value
    })
  }

  const defaultValue = (row) =>{
    console.log(row)
    setFormValue({
      uuid:row.uuid,
      komoditas:row.komoditas,
      provinsi:row.area_provinsi,
      kota:row.area_kota,
      harga:row.price,
      ukuran:row.size
    })
  }

  const template = () => (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Kota</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            {list_option_area_state.data.map(item => (
              item.city?<MenuItem value={item.city}>{item.city}</MenuItem>:''
            ))}
          </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Provinsi</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            {list_option_area_state.data.map(item => (
              item.province?<MenuItem value={item.province}>{item.province}</MenuItem>:''
            ))}
          </Select>
      </FormControl>

    </div>
  )

  const refresh = () =>{
    dispatch(list_comodity())
  }

  useEffect(() => {
    const fetchData = async () => {
       const res = await dispatch(list_comodity())
       const area = await dispatch(option_area())
       const size = await dispatch(option_size())
       await setData(res.length)
       console.log(area)
       console.log(size)
    };
    fetchData();
    
  }, ([dispatch]));

  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <ListTable 
          data={list_data_comodity_state} 
          isShowModal={showModal} 
          toggleModal={()=>toggleModal()} 
          successAlert={successAlert}
          toggleSuccess={()=>toggleSuccess()}
          handleForm={(e)=>handleForm(e)}
          defaultValue={(row)=>defaultValue(row)}
          setFormValue={(row)=>setFormValue(row)}
          formValue={formValue}
          refresh={()=>refresh()}
          template={template()}
          age={age}
        />
      </Suspense>
    </div>
  );
}

export default Comodity;