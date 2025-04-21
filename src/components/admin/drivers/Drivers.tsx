import { useState } from "react";
import { Driver, IActions } from "../../../interfaces/interfaces";
import { useRouter } from "next/navigation";
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
import ModalBasic from "@/components/modalGeneric/modal-basic";
import DeleteModal from "@/components/modalGeneric/DeleteModal";
import HeadTable from "./headTable";
// import EditIcon from "@/icons/EditIcon";
// import DetailsIcon from "@/icons/Details";

const Drivers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [itemSelectIdTable, setSelectItemTable] = useState<Driver>();
  // const [create, setCreate] = useState<boolean>(false);
  // const [edit, setEdit] = useState<Driver>();
  const [remove, setRemove] = useState<string | undefined>("");
  // const [details, setDetails] = useState<Driver>();
  // const [title, setTitle] = useState("Drivers");

  const handleCreate = () => {
    // setCreate(true);
    setModalOpen(true);
    // setDetails(undefined);
    // setEdit(undefined);
    setRemove(undefined);
  };

  // const handleEdit = (item: Driver) => {
  //   setDetails(undefined);
  //   setRemove(undefined);
  //   setEdit(item);
  //   setCreate(false);
  // };

  // const handleDetails = (item: Driver) => {
  //   setDetails(item);
  //   setEdit(undefined);
  //   setRemove(undefined);
  //   setCreate(false);
  // };

  const handleInactive = () => {
    // setDetails(undefined);
    setModalDelete(true);
    // setEdit(undefined);
    // setCreate(false);
    setRemove("delete");
  };

  const actions: IActions[] = [
    // {
    //   handleActions: (e: Driver) => handleEdit(e),
    //   icon: <EditIcon />,
    //   tooltip: "Edit",
    //   title: "Edit",
    // },
    // {
    //   handleActions: (e: Driver) => handleDetails(e),
    //   icon: <DetailsIcon />,
    //   tooltip: "Details",
    //   title: "Details",
    // },
    {
      handleActions: () => handleInactive(),
      icon: <RemoveIcon />,
      tooltip: "Delete",
      title: "Delete",
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
    entity: DriverApiServices,
    fallbackData: [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
       
      },
      {
        id: "2",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "1234567890",
   
      },
    ],
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
          hiddenCreate={true}
        />

        {/* Table */}
        <GenericTable
          data={[
            {
              id: "1",
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "1234567890",

            },
            {
              id: "2",
              name: "Jane Doe",
              email: "jane.doe@example.com",
              phone: "1234567890",
             
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
      {/* <ModalBasic
        maxW="max-w-[100rem]"
        width="w-[40rem]"
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title={title}
      > */}
      {/* {details && (
          <DetailsPractice
            item={details}
            setOpen={setModalOpen}
            handleEdit={handleEdit}
            setTitle={setTitle}
          />
        )} */}
      {/* {(create || edit) && (
          <FormCreateEditPractice
            item={edit}
            setOpen={setModalOpen}
            handleEdit={handleEdit}
            setTitle={setTitle}
          />
        )} */}
      {/* <div className=" p-6 text-white">Modal</div> */}
      {/* </ModalBasic> */}
      {remove && itemSelectIdTable && (
        <DeleteModal
          setDangerModalOpen={setModalDelete}
          dangerModalOpen={modalDelete}
          id={itemSelectIdTable.id}
          action={remove}
          remove={true}
          title={"Delete Driver"}
          entity={DriverApiServices}
          key_cache={CACHE_KEYS_TABLE.TABLE_LIST_ALL}
          message={"Do you confirm to delete this driver?"}
          messageSuccessfully={"Driver deleted successfully"}
        />
      )}
    </SelectedItemsProvider>
  );
};

export default Drivers;
