import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Payment } from "../interfaces/interfaces";

// Add type declaration for jspdf-autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => void;
    lastAutoTable: { finalY: number };
  }
}

// Function to format date to a readable string
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Function to generate and download PDF invoice
export const generatePaymentPDF = (payment: Payment) => {
  // Create new PDF document
  const doc = new jsPDF();

  // Add company logo/header
  doc.setFontSize(20);
  doc.setTextColor(44, 62, 80);
  doc.text("PAYMENT INVOICE", 105, 20, { align: "center" });

  // Add invoice information
  doc.setFontSize(12);
  doc.setTextColor(52, 73, 94);

  // Company info
  doc.text("Your Company Name", 20, 40);
  doc.setFontSize(10);
  doc.text("123 Business Street", 20, 45);
  doc.text("City, Country", 20, 50);
  doc.text("Phone: +1 234 567 890", 20, 55);

  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice Date: ${formatDate(payment.transactionDate)}`, 20, 70);
  doc.text(`Invoice #: ${payment.id}`, 20, 75);

  // Customer information
  doc.setFontSize(12);
  doc.text("Bill To:", 20, 90);
  doc.setFontSize(10);
  doc.text(`${payment.customerName} ${payment.customerLastName}`, 20, 95);
  doc.text(`Phone: ${payment.phoneNumber}`, 20, 100);

  // Payment details table
  const tableData = [
    ["Description", "Payment Method", "Status", "Amount"],
    [
      "Payment Transaction",
      payment.paymentMethod,
      payment.status,
      `$${payment.amount.toFixed(2)}`,
    ],
  ];

  autoTable(doc, {
    startY: 110,
    head: [tableData[0]],
    body: [tableData[1]],
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 10 },
  });

  // Add total amount
  const finalY =
    (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
      .finalY || 150;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount: $${payment.amount.toFixed(2)}`, 150, finalY + 20, {
    align: "right",
  });

  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text("Thank you for your business!", 105, 280, { align: "center" });

  // Download the PDF
  doc.save(`invoice-${payment.id}.pdf`);
};
