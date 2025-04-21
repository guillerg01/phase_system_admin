import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import PaymentApiServices from "@/services/PaymentApiServices";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  startDate: yup.string().required("Start date is required"),
  endDate: yup
    .string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) return true;
        return new Date(endDate) > new Date(startDate);
      }
    ),
});

const FormExport = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted && startDate && endDate) {
      validateDates();
    }
  }, [startDate, endDate, isSubmitted]);

  const validateDates = async () => {
    if (!startDate || !endDate) {
      setError("Both dates are required");
      return false;
    }

    try {
      await validationSchema.validate({ startDate, endDate });
      setError("");
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      }
      return false;
    }
  };

  const handleExport = async () => {
    setIsSubmitted(true);

    if (!startDate || !endDate) {
      setError("Both dates are required");
      return;
    }

    const isValid = await validateDates();
    if (!isValid) return;

    try {
      // Get data from API
      //   const response = await PaymentApiServices.export({
      //     startDate,
      //     endDate,
      //   });
      const response = [
        {
          "Transaction Date": "2024-01-01",
          "Customer Name": "John Doe",
          Amount: 100,
          "Payment Method": "Credit Card",
          Status: "Completed",
          "Phone Number": "1234567890",
        },
        {
          "Transaction Date": "2024-01-02",
          "Customer Name": "Jane Smith",
          Amount: 150,
          "Payment Method": "Debit Card",
          Status: "Pending",
          "Phone Number": "9876543210",
        },
      ];
      // Create worksheet from data
      const worksheet = XLSX.utils.json_to_sheet(response);

      // Format column headers
      const headers = [
        "Transaction Date",
        "Customer Name",
        "Amount",
        "Payment Method",
        "Status",
        "Phone Number",
      ];

      // Set column widths
      const colWidths = headers.map(() => ({ wch: 20 }));
      worksheet["!cols"] = colWidths;

      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

      // Generate Excel file
      XLSX.writeFile(
        workbook,
        `payments-export-${new Date().toISOString().split("T")[0]}.xlsx`
      );

      setOpen(false);
    } catch (error) {
      console.error("Error exporting payments:", error);
      setError("Error exporting payments. Please try again.");
    }
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    if (field === "startDate") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const isButtonDisabled = isSubmitted && (!!error || !startDate || !endDate);

  return (
    <div className="p-4 space-y-4 text-white">
      <div className="space-y-2">
        <label htmlFor="startDate" className="block text-sm font-medium">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => handleDateChange("startDate", e.target.value)}
          className="w-full p-2 border rounded-md bg-transparent text-white [color-scheme:dark]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="endDate" className="block text-sm font-medium">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => handleDateChange("endDate", e.target.value)}
          className="w-full p-2 border rounded-md bg-transparent text-white [color-scheme:dark]"
        />
      </div>

      {isSubmitted && error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleExport}
        className={`w-full py-2 px-4 rounded-md ${
          !isButtonDisabled
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            : "bg-gray-500 cursor-not-allowed"
        } text-white`}
        disabled={isButtonDisabled}
      >
        Export Payments
      </button>
    </div>
  );
};

export default FormExport;
