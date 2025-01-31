import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFileCsv } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';

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
        console.log('stocks data:', response.data);
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
      name: 'Date',
      selector: (row) => row.stock_invoice?.date || 'N/A',
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
      selector: (row) => Number(row.length).toFixed(2),
      sortable: true,
    },
    {
      name: 'Width',
      selector: (row) => Number(row.width).toFixed(2),
      sortable: true,
    },
    {
      name: 'Unit',
      selector: (row) => row.unit,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Out Quantity',
      selector: (row) => row.out_quantity ?? 0,
      sortable: true,
    },
    {
      name: 'Avaible Quantity',
      selector: (row) => row.quantity - row.out_quantity,
      sortable: true,
    },
    {
      name: 'Warehouse',
      selector: (row) => row.warehouse,
      sortable: true,
    },
  ];

  const exportToCSV = () => {
    const csvData = filteredProducts.map((row, index) => ({
      'Sr No': index + 1,
      'User Name': JSON.parse(localStorage.getItem('user')).username || 'N/A',
      'User Email': JSON.parse(localStorage.getItem('user')).email || 'N/A',
      'Lot No': row.lot_no,
      'Stock Code': `${row.stock_product?.shadeNo}-${row.stock_code}` || 'N/A',
      'Invoice No': row.stock_invoice?.invoice_no || 'N/A',
      'Date': row.stock_invoice?.date || 'N/A',
      'Shade No': row.stock_product?.shadeNo || 'N/A',
      'Pur. Shade No': row.stock_product?.purchase_shade_no || 'N/A',
      'Length': row.length,
      'Width': row.width,
      'Unit': row.unit,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'stocks_list.csv');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Stocks List', 20, 10);
    doc.autoTable({
      head: [
        [
          'Sr No',
          'User Name',
          'Lot No',
          'Stock Code',
          'Invoice No',
          'Date',
          'Shade No',
          'Pur. Shade No',
          'Length',
          'Width',
          'Unit',
          'Warehouse',
        ],
      ],
      body: filteredProducts.map((row, index) => [
        index + 1,
        JSON.parse(localStorage.getItem('user')).username || 'N/A',
        row.lot_no,
        `${row.stock_product?.shadeNo}-${row.stock_code}` || 'N/A',
        row.stock_invoice?.invoice_no || 'N/A',
        row.stock_invoice?.date || 'N/A',
        row.stock_product?.shadeNo || 'N/A',
        row.stock_product?.purchase_shade_no || 'N/A',
        row.length,
        row.width,
        row.unit,
        row.warehouse,
      ]),
    });
    doc.save('stocks_list.pdf');
  };

  const customStyles = {
    table: {
      style: {
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
    },
    rows: {
      style: {
        backgroundColor: '#f0fff4',
        '&:hover': {
          backgroundColor: '#e6f4ea',
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: '#20B2AA',
        color: '#fff',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  };

  return (
    <div className="container-fluid pt-4">
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search..."
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="d-flex justify-content-end">
              <button className="btn btn-info" onClick={exportToCSV}>
                <FaFileCsv /> Export as CSV
              </button>
              <button className="btn btn-info" onClick={exportToPDF}>
                <AiOutlineFilePdf /> Export as PDF
              </button>
            </div>
            {loading ? (
              <Skeleton count={10} />
            ) : (
              <DataTable
                columns={columns}
                data={filteredProducts}
                pagination
                highlightOnHover
                customStyles={customStyles}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
