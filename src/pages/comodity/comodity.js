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
  const [province,setProvince] = useState('')
  const [size,setSize] = useState('')
  const [city,setCity] = useState('')
  const [filterData,setFilterData] = useState('')
  const [loading,setLoading] = useState(false)


  const list_data_comodity_state = useSelector(
    (state) => state.list_data_comodity_state
  );

  const list_option_area_state = useSelector(
    (state) => state.option_area_state
  );

  const list_option_size_state = useSelector(
    (state) => state.option_size_state
  );

  const filtered_data = (data,filtersObject) =>{
    for (let key in filtersObject) {
      data = data.filter((option) => option[key] === filtersObject[key]);
    }
    const obj ={
      data:data
    }
    return obj;
  }

  const handleCity = (event) => {
    if(event.target.value !== ''){
      setCity(event.target.value)
      setFilterData({
        ...filterData,
        area_kota:event.target.value
      })
    }else{
      setSize('')
      setCity('')
      setProvince('')
      setFilterData(delete filterData.area_kota)
    }
  };

  const handleSize = (event) => {
    if(event.target.value !== ''){
      setSize(event.target.value)
      setFilterData({
        ...filterData,
        size:event.target.value
      })
    }else{
      setSize('')
      setCity('')
      setProvince('')
      setFilterData(delete filterData.size)
    }
  };

  const handleProvince = (event) => {
    if(event.target.value !== ''){
      setProvince(event.target.value)
      setFilterData({
        ...filterData,
        area_provinsi:event.target.value
      })
    }else{
      setSize('')
      setCity('')
      setProvince('')
      setFilterData(delete filterData.area_provinsi)
    }
  };

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
  }

  const isLoading = (row)=>{
    setLoading(row)
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
            value={city}
            onChange={handleCity}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {list_option_area_state.data.map((item,index) => (
              item.city?<MenuItem value={item.city} key={index}>{item.city}</MenuItem>:''
            ))}
          </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Provinsi</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={province}
            onChange={handleProvince}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {list_option_area_state.data.map((item,index) => (
              item.province?<MenuItem value={item.province} key={index}>{item.province}</MenuItem>:''
            ))}
          </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Ukuran</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={size}
            onChange={handleSize}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {list_option_size_state.data.map((item,index) => (
              item.size?<MenuItem value={item.size} key={index}>{item.size}</MenuItem>:''
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
      await dispatch(list_comodity())
      await dispatch(option_area())
      await dispatch(option_size())
    };
    fetchData();
    
  }, ([dispatch]));

  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <ListTable 
          data={filtered_data(list_data_comodity_state.data, filterData)} 
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
          loading={loading}
          setLoading={(row)=>isLoading(row)}
        />
      </Suspense>
    </div>
  );
}

export default Comodity;