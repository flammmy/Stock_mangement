import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stocks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching stocks data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocksData();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      ['width', 'length', 'invoice_no', 'lot_no']
        .map((key) => product[key]?.toString()?.toLowerCase() || '')
        .some((value) => value.includes(lowercasedQuery))
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const columns = [
    {
      name: 'Sr No',
      selector: (_, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Lot No',
      selector: (row) => row.lot_no,
      sortable: true,
    },
    {
      name: 'Invoice No',
      selector: (row) => row.stock_invoice?.invoice_no || 'N/A',
      sortable: true,
    },
    {
      name: 'Shade No',
      selector: (row) => row.stock_product?.shadeNo || 'N/A',
      sortable: true,
    },
    {
      name: 'Pur. Shade No',
      selector: (row) => row.stock_product?.purchase_shade_no || 'N/A',
      sortable: true,
    },
    {
      name: 'Length',
      selector: (row) => row.length,
      sortable: true,
    },
    {
      name: 'Width',
      selector: (row) => row.width,
      sortable: true,
    },
    {
      name: 'Unit',
      selector: (row) => row.unit,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: 'Area (m²)',
      selector: (row) => row.area,
      sortable: true,
    },
    {
      name: 'Area (sq. ft.)',
      selector: (row) => row.area_sq_ft,
      sortable: true,
    },
  ];
  const exportToCSV = () => {
    const csv = Papa.unparse(filteredProducts);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'stocks_list.csv');
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('stocks List', 20, 10);
    doc.autoTable({
      head: [['Sr No', 'Lot No', 'Invoice No', 'Shade No', 'Pur. Shade No', 'Length', 'Width', 'Unit', 'Quantity', 'Area (m²)', 'Area (sq. ft.)']],
      body: filteredProducts.map((row) => [row.index, row.lot_no, row.stock_invoice?.invoice_no || 'N/A', row.stock_product?.shadeNo || 'N/A', row.stock_product?.purchase_shade_no || 'N/A', row.length, row.width, row.unit, row.qty, row.area, row.area_sq_ft]),
    });
    doc.save('stocks_list.pdf');
  };

  const customStyles = {
    header: {
      style: {
        backgroundColor: '#2E8B57',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '15px',
      },
    },
    rows: {
      style: {
        backgroundColor: '#f0fff4',
        borderBottom: '1px solid #e0e0e0',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#e6f4ea',
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: '#20B2AA',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '15px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        color: '#333',
        padding: '12px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#3f4d67',
        color: '#fff',
        borderRadius: '0 0 8px 8px',
      },
      pageButtonsStyle: {
        backgroundColor: 'transparent',
        color: '#fff',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)',
        },
      },
    },
  };

  return (
    <div
      className="container-fluid pt-4"
      style={{ border: '3px dashed #14ab7f', borderRadius: '8px', background: '#ff9d0014' }}
    >
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search..."
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            className="form-control"
            style={{ borderRadius: '5px' }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-sm btn-primary" onClick={exportToCSV}>
                Export as CSV
              </button>
              <button type="button" className="btn btn-sm btn-primary" onClick={exportToPDF}>
                Export as PDF
              </button>
            </div>
            {loading ? (
              <div>
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', gap: '10px', padding: '10px' }}
                  >
                    <Skeleton width={50} height={20} />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={200} height={20} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-body p-0">

                <DataTable
                  columns={columns}
                  data={filteredProducts}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                  customStyles={customStyles}
                  defaultSortFieldId={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
