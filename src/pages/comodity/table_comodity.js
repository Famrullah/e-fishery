import React from 'react'
import DataTable from 'react-data-table-component';

function table_list(props){
    
      const columns = [
          {
              name: 'Komoditas',
              selector: 'komoditas',
              sortable: true,
            //   center:true,
              cell: row => <div>{(row.komoditas == null)?<div>-</div>:<div>{row.komoditas}</div>}</div>,
          },
          {
              name: 'Provinsi',
              selector: 'area_provinsi',
              sortable: true,
            //   center:true,
              cell: row => <div>{(row.area_provinsi == null)?<div>-</div>:<div>{row.area_provinsi}</div>}</div>,
          },
          {
              name: 'Kota',
              selector: 'area_kota',
              sortable: true,
            //   center:true,
              cell: row => <div>{(row.area_kota == null)?<div>-</div>:<div>{row.area_kota}</div>}</div>,
          },
          {
              name: 'Harga',
              selector: 'price',
              sortable: true,
            //   center:true,
            //   cell: row => <div>{(row.area_kota == null)?<div>-</div>:<div>{row.area_kota}</div>}</div>,
          },
          {
              name: 'Ukuran',
              selector: 'size',
              sortable: true,
            //   center:true,
            //   cell: row => <div>{(row.area_kota == null)?<div>-</div>:<div>{row.area_kota}</div>}</div>,
          },
      ];
  
    
    const { data } = props.data
    
    // const desc = data.data.sort(function (x, y) {
    //     return x.komoditas - y.komoditas;
    //  });
    return(
    <div>
        <DataTable
            title="Komoditas"
            columns={columns}
            data={data}
            striped={true}
            defaultSortField="komoditas"
        />
    </div>
    )
}

export default table_list

