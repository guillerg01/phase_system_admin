import { useState } from "react";
import { Payment } from "../../../interfaces/interfaces";
import { useGenericTableStore } from "@/hooks/useGenerictableStore";
import {
  CACHE_KEYS_TABLE,
  constParams,
  countRows,
} from "./constParams/constParams";
import { generatePaymentPDF } from "@/utils/pdfGenerator";

import { SelectedItemsProvider } from "@/context/selected-items-context";
import RemoveIcon from "@/icons/DeleteIcon";
import GenericTable from "@/components/table/GenericTable";
import PaginationClassic from "@/components/table/pagination-classic";
import DeleteModal from "@/components/modalGeneric/DeleteModal";
import HeadTable from "./headTable";
import PaymentApiServices from "@/services/PaymentApiServices";
import ModalBasic from "@/components/modalGeneric/modal-basic";
import FormExport from "./form/formExport";
import { FaDownload } from "react-icons/fa";
const Payments = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const [itemSelectIdTable, setSelectItemTable] = useState<Payment>();
  const [remove, setRemove] = useState<string | undefined>("");
  const [exportData, setExportData] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInactive = () => {
    setModalDelete(true);
    setRemove("delete");
  };

  const actions = [
    {
      handleActions: () => handleInactive(),
      icon: <RemoveIcon />,
      tooltip: "Delete",
      title: "Delete",
    },
    {
      handleActions: () => handleGenerateFile(),
      icon: <FaDownload />,
      tooltip: "Download",
      title: "Download",
    },
  ];

  const {
    totalElements,
    totalPages,
    nextPage,
    prevPage,
    setParams,
    isLoading,
    setSearchData,
    data,
    pageNumber,
  } = useGenericTableStore({
    key: CACHE_KEYS_TABLE.TABLE_LIST_ALL,
    countRows: countRows,
    entity: PaymentApiServices,
    fallbackData: [
      {
        id: "1",
        transactionDate: "2024-03-14T10:30:00",
        amount: 150.0,
        paymentMethod: "CARD",
        bankName: "Bank of America",
        status: "CONFIRMED",
        customerName: "John",
        customerLastName: "Doe",
        phoneNumber: "1234567890",
      },
      {
        id: "2",
        transactionDate: "2024-03-14T11:45:00",
        amount: 75.5,
        paymentMethod: "CASH",
        status: "PENDING",
        customerName: "Jane",
        customerLastName: "Smith",
        phoneNumber: "9876543210",
      },
    ],
  });

  const handleExport = () => {
    setExportData(true);
    setIsOpen(true);
  };
  const handleGenerateFile = () => {
    if (itemSelectIdTable) {
      generatePaymentPDF(itemSelectIdTable);
    }
  };
  return (
    <SelectedItemsProvider>
      <div className={`px-4 sm:px-6 lg:px-8 py-8 w-full`}>
        <HeadTable
          setParams={setParams}
          setSearch={setSearchData}
          totalElements={totalElements}
          handleExport={handleExport}
        />

        <GenericTable
          data={[
            {
              id: "1",
              transactionDate: "2024-03-14T10:30:00",
              amount: 150.0,
              paymentMethod: "CARD",
              bankName: "Bank of America",
              status: "CONFIRMED",
              customerName: "John",
              customerLastName: "Doe",
              phoneNumber: "1234567890",
            },
            {
              id: "2",
              transactionDate: "2024-03-14T11:45:00",
              amount: 75.5,
              paymentMethod: "CASH",
              status: "PENDING",
              customerName: "Jane",
              customerLastName: "Smith",
              phoneNumber: "9876543210",
            },
          ]}
          columns={constParams}
          totalElements={totalElements}
          loading={false}
          setSelectItemsTable={setSelectItemTable}
          actions={actions}
          isAdmin={false}
        />

        <PaginationClassic
          handleNext={nextPage}
          handleBefore={prevPage}
          total={totalElements}
          pageNumber={pageNumber}
          countRows={countRows}
          totalPages={totalPages}
        />
      </div>

      <ModalBasic
        maxW="max-w-[100rem]"
        width="w-[40rem]"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Export Data"}
      >
        {exportData && isOpen && <FormExport setOpen={setIsOpen} />}
      </ModalBasic>
      {remove && itemSelectIdTable && (
        <DeleteModal
          setDangerModalOpen={setModalDelete}
          dangerModalOpen={modalDelete}
          id={itemSelectIdTable.id}
          action={remove}
          remove={true}
          title={"Delete Payment"}
          entity={PaymentApiServices}
          key_cache={CACHE_KEYS_TABLE.TABLE_LIST_ALL}
          message={"Do you confirm to delete this payment?"}
          messageSuccessfully={"Payment deleted successfully"}
        />
      )}
    </SelectedItemsProvider>
  );
};

export default Payments;
