import { useState } from "react";
import { Driver, IActions, Reservation } from "../../../interfaces/interfaces";

import { useGenericTableStore } from "@/hooks/useGenerictableStore";
import {
  CACHE_KEYS_TABLE,
  constParams,
  countRows,
} from "./constParams/constParams";
import DriverApiServices from "@/services/DriverApiServices";
import { SelectedItemsProvider } from "@/context/selected-items-context";
import RemoveIcon from "@/icons/DeleteIcon";
import GenericTable from "@/components/table/GenericTable";
import PaginationClassic from "@/components/table/pagination-classic";

import DeleteModal from "@/components/modalGeneric/DeleteModal";
import HeadTable from "./headTable";
import ReservationApiServices from "@/services/ReservationApiServices";
import { FaTimes } from "react-icons/fa";
import ModalBasic from "@/components/modalGeneric/modal-basic";
import FormReservation from "./form/formReservation";
import EditIcon from "@/icons/EditIcon";
// import EditIcon from "@/icons/EditIcon";
// import DetailsIcon from "@/icons/Details";

const Drivers = () => {
  const [itemSelectIdTable, setSelectItemTable] = useState<Reservation>();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [title, setTitle] = useState("Reservations");

  const handleDelete = () => {
    setModalDelete(true);
  };

  const handleCreate = () => {
    setModalCreate(true);
    setModalEdit(false);
    setTitle("Create Reservation");
  };  

  const handleEdit = (item: Reservation) => {
    setModalEdit(true);
    setModalCreate(false);
    setSelectItemTable(item);
    setTitle("Edit Reservation");
  };

  const actions: IActions[] = [
    {
      icon: <FaTimes />,
      tooltip: "Cancel",
      handleActions: () => handleDelete(),
      title: "Cancel",
      hidden: false,
    },
    {
      icon: <EditIcon />,
      tooltip: "Edit",
      title: "Edit",
      handleActions: (item: Reservation) => handleEdit(item),
      hidden: false,
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
    entity: ReservationApiServices,
    fallbackData: [],
  });
  console.log(data);

  return (
    <SelectedItemsProvider>
      <div className={`px-4 sm:px-6 lg:px-8  py-8 w-full`}>
        <HeadTable
          setCreate={handleCreate}
          setParams={setParams}
          setSearch={setSearchData}
          totalElements={totalElements}
          hiddenCreate={false}
        />

        {/* Table */}
        <GenericTable
          data={[
            {
              id: "1",
              name: "John Doe",
              lastName: "Doe",
              ci: "1234567890",
              hoursToUse: 10,
              price: 100,
              status: "PENDING",
            },
            {
              id: "2",
              name: "Jane Doe",
              lastName: "Doe",
              ci: "1234567890",
              hoursToUse: 10,
              price: 100,
              status: "PENDING",
            },
          ]}
          columns={constParams}
          totalElements={totalElements}
          loading={false}
          setSelectItemsTable={setSelectItemTable}
          actions={actions}
          isAdmin={false}
        />

        {/* Pagination */}

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
        maxW="max-w-[40rem]"
        width="w-[40rem]"
        isOpen={modalCreate || modalEdit}
        setIsOpen={modalCreate ? setModalCreate : setModalEdit}
        title={title}
      >
        <FormReservation
          setOpen={setModalCreate}
          item={itemSelectIdTable}
          onSuccess={() => {
            setModalCreate(false);
          }}
        />
      </ModalBasic>

      {modalDelete && itemSelectIdTable && (
        <DeleteModal
          setDangerModalOpen={setModalDelete}
          dangerModalOpen={modalDelete}
          id={itemSelectIdTable.id}
          action={"remove"}
          nameCustom={'Cancel'}
          remove={true}
          title={"Cancel Reservation"}
          entity={ReservationApiServices}
          key_cache={CACHE_KEYS_TABLE.TABLE_LIST_ALL}
          message={"Do you confirm to cancel this reservation?"}
          messageSuccessfully={"Reservation cancelled successfully"}
        />
      )}
    </SelectedItemsProvider>
  );
};

export default Drivers;
