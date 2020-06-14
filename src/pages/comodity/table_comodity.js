import React from 'react'
import DataTable from 'react-data-table-component';
import moment from 'moment'

function table_list(props){

  // const actions = <button key="add">Add</button>;
  const fomat_date = (date) => {
    return moment(new Date(date)).format("DD MMMM YYYY")
  }
  const columns = [
    {
      name: 'Komoditas',
      selector: 'komoditas',
      sortable: true,
      cell: row => <div>{(row.komoditas == null)?<div>-</div>:<div>{row.komoditas}</div>}</div>,
    },
    {
      name: 'Provinsi',
      selector: 'area_provinsi',
      sortable: true,
      cell: row => <div>{(row.area_provinsi == null)?<div>-</div>:<div>{row.area_provinsi}</div>}</div>,
    },
    {
      name: 'Kota',
      selector: 'area_kota',
      sortable: true,
      cell: row => <div>{(row.area_kota == null)?<div>-</div>:<div>{row.area_kota}</div>}</div>,
    },
    {
      name: 'Harga',
      selector: 'price',
      sortable: true,
      cell: row => <div>{(row.area_kota == null)?<div>-</div>:<div>{row.price}</div>}</div>,
    },
    {
      name: 'Ukuran',
      selector: 'size',
      sortable: true,
      cell: row => <div>{(row.size == null)?<div>-</div>:<div>{row.size}</div>}</div>,
    },
    {
      name: 'Tanggal',
      selector: 'tgl_parsed',
      sortable: true,
      cell: row => <div>{(!row.tgl_parsed)?<div>-</div>:<div>{fomat_date(row.tgl_parsed)}</div>}</div>,
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
      // actions={actions}
    />
  </div>
  )
}

export default table_list