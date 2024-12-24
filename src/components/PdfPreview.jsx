import React from 'react';
import { Modal } from 'react-bootstrap';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline'
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1pt solid #ccc'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: 120,
    fontWeight: 'bold',
    fontSize: 10
  },
  value: {
    flex: 1,
    fontSize: 10
  },
  table: {
    marginTop: 10
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid black',
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #ccc',
    paddingVertical: 5,
    fontSize: 10
  },
  col: {
    flex: 1,
    textAlign: 'center'
  }
});

const InvoicePDFViewer = ({ show, onHide, invoiceData, id }) => {
    const invoice = invoiceData.find(invoice => invoice.id === id);
    console.log(invoice)
  return (
    <Modal show={show} onHide={onHide} size="lg">
      {console.log(id)}
      <Modal.Header closeButton>
        <Modal.Title>Invoice PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '80vh' }}>
        <PDFViewer width="100%" height="100%">
          <Document>
            <Page size="A4" style={styles.page}>
              <Text style={styles.header}>Tax Invoice</Text>

              <View style={styles.section}>
                <View style={styles.row}>
                  <Text style={styles.label}>Invoice No:</Text>
                  <Text style={styles.value}>{invoice.invoice_no}</Text>
                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>{invoice.date}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Ack No:</Text>
                  <Text style={styles.value}>{invoice.ack_no}</Text>
                  <Text style={styles.label}>Ack Date:</Text>
                  <Text style={styles.value}>{invoice.ack_date}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.label, { fontSize: 12 }]}>Supplier Details:</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{invoice.supplier.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>GST No:</Text>
                  <Text style={styles.value}>{invoice.supplier.gst_no}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>CIN No:</Text>
                  <Text style={styles.value}>{invoice.supplier.cin_no}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.label, { fontSize: 12 }]}>Receiver Details:</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{invoice.receiver.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>GST No:</Text>
                  <Text style={styles.value}>{invoice.receiver.gst_no}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Code:</Text>
                  <Text style={styles.value}>{invoice.receiver.code}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.label, { fontSize: 12 }]}>Bank Details:</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Bank Name:</Text>
                  <Text style={styles.value}>{invoice.bank.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Branch:</Text>
                  <Text style={styles.value}>{invoice.bank.branch}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>IFSC:</Text>
                  <Text style={styles.value}>{invoice.bank.ifsc_code}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Account No:</Text>
                  <Text style={styles.value}>{invoice.bank.account_number}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.label, { fontSize: 12 }]}>Products:</Text>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.col}>Name</Text>
                    <Text style={styles.col}>Quantity</Text>
                    <Text style={styles.col}>Price</Text>
                    <Text style={styles.col}>Total</Text>
                  </View>
                  {invoice.products.map((product, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.col}>{product.name}</Text>
                      <Text style={styles.col}>{product.quantity}</Text>
                      <Text style={styles.col}>{product.price}</Text>
                      <Text style={styles.col}>{product.total}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.label, { fontSize: 12 }]}>Additional Details:</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Total Amount:</Text>
                  <Text style={styles.value}>₹{invoice.total_amount}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>CGST (%):</Text>
                  <Text style={styles.value}>{invoice.cgst_percentage}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>SGST (%):</Text>
                  <Text style={styles.value}>{invoice.sgst_percentage}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>E-way Bill:</Text>
                  <Text style={styles.value}>{invoice.ewaybill}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Transport:</Text>
                  <Text style={styles.value}>{invoice.transport}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Vehicle No:</Text>
                  <Text style={styles.value}>{invoice.vehicle_no}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Place of Supply:</Text>
                  <Text style={styles.value}>{invoice.place_of_supply}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Station:</Text>
                  <Text style={styles.value}>{invoice.station}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>IRN:</Text>
                  <Text style={styles.value}>{invoice.irn}</Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Modal.Body>
    </Modal>
  );
};
export default InvoicePDFViewer;
