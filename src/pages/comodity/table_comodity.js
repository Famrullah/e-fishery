import React from 'react'
import DataTable from 'react-data-table-component';
import moment from 'moment'
import Modal from '../../components/modal/modal';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import SteinStore from 'stein-js-client'

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list/"
);

function table_list(props){
  console.log(props)
  const update_harga = (obj) => {
    const num = props.formValue.harga
    const remove_comma = num.replace(/[ ,]/g, "");
    const format_num = Math.floor(remove_comma)
    store
    .edit("", {
      search: { uuid: props.formValue.uuid },
      set: { price:format_num}
    })
    .then(res => {
      props.toggleModal()
      props.refresh()
    });
  }
  const open = (row) => {
    props.toggleModal()
    props.defaultValue(row)
  }

  const fomat_date = (date) => {
    return moment(new Date(date)).format("DD MMMM YYYY")
  }
  const columns = [
    {
      name: 'Komoditas',
      selector: 'komoditas',
      sortable: true,
      cell: row => <div>{(!row.komoditas)?<div>-</div>:<div>{row.komoditas}</div>}</div>,
    },
    {
      name: 'Provinsi',
      selector: 'area_provinsi',
      sortable: true,
      right: true,
      cell: row => <div>{(!row.area_provinsi)?<div>-</div>:<div>{row.area_provinsi}</div>}</div>,
    },
    {
      name: 'Kota',
      selector: 'area_kota',
      sortable: true,
      right: true,
      cell: row => <div>{(!row.area_kota)?<div>-</div>:<div>{row.area_kota}</div>}</div>,
    },
    {
      name: 'Harga',
      selector: 'price',
      sortable: true,
      right: true,
      cell: row => <div>{(!row.price)?<div>-</div>:<div>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.price)}</div>}</div>,
    },
    {
      name: 'Ukuran',
      selector: 'size',
      sortable: true,
      right: true,
      cell: row => <div>{(!row.size)?<div>-</div>:<div>{row.size}</div>}</div>,
    },
    {
      name: 'Tanggal',
      selector: 'tgl_parsed',
      sortable: true,
      right: true,
      cell: row => <div>{(!row.tgl_parsed)?<div>-</div>:<div>{fomat_date(row.tgl_parsed)}</div>}</div>,
    },
    {
      name: 'Action',
      cell: row => <div><button className="btn-default action" onClick={()=> open(row)}>Action</button></div>,
      right: true,
    },
  ];

  const { data } = props.data
  return(
  <div>
    <DataTable
      title="Komoditas"
      columns={columns}
      data={data}
      striped={true}
      pagination
      defaultSortField="tgl_parsed"
      defaultSortAsc={true}
    />
    <Modal show={props.isShowModal}  modalClosed={()=> props.toggleModal()}>
      <div className="form-update">
        <div className="form-update__header">
          <span>Update Harga</span>
        </div>
        <form>
          <CurrencyTextField
            label="Amount"
            name="harga"
            variant="standard"
            value={props.formValue.harga}
            currencySymbol="Rp"
            outputFormat="number"
            onChange={(event)=>props.handleForm(event)}
          />
        </form>
          <button className="btn-default action btn-update" onClick={update_harga}>Update</button>
      </div>
    </Modal>
  </div>
  )
}

export default table_list