import { useState } from "react";
import {
  ElectricCarChargingTariff,
  IActions,
} from "../../../interfaces/interfaces";
import { useGenericTableStore } from "@/hooks/useGenerictableStore";
import {
  CACHE_KEYS_TABLE,
  constParams,
  countRows,
} from "./constParams/constParams";
import { SelectedItemsProvider } from "@/context/selected-items-context";
import RemoveIcon from "@/icons/DeleteIcon";
import GenericTable from "@/components/table/GenericTable";
import PaginationClassic from "@/components/table/pagination-classic";
import ModalBasic from "@/components/modalGeneric/modal-basic";
import DeleteModal from "@/components/modalGeneric/DeleteModal";
import HeadTable from "./headTable";
import EditIcon from "@/icons/EditIcon";
import TariffApiServices from "@/services/TariffApiServices";
import FormTariff from "./form/formTariff";
import { FaHistory } from "react-icons/fa";
import HistoryTariff from "./historyTariff/history";

const Tariffs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [itemSelectIdTable, setSelectItemTable] =
    useState<ElectricCarChargingTariff>();
  const [create, setCreate] = useState<boolean>(false);
  const [edit, setEdit] = useState<ElectricCarChargingTariff>();
  const [remove, setRemove] = useState<string | undefined>("");
  const [title, setTitle] = useState("Tariffs");
  const [historyTariffs, setHistoryTariffs] =
    useState<ElectricCarChargingTariff>();
  const [dataFormated, setDataFormated] = useState<ElectricCarChargingTariff[]>(
    [
      {
        id: "1",
        pricePerHour: 10,
        priceFastCharge: 10,
        priceHighConcurrency: 10,
        minChargingTime: 10,
      },
      {
        id: "2",
        pricePerHour: 10,
        priceFastCharge: 10,
        priceHighConcurrency: 10,
        minChargingTime: 10,
      },
    ]
  );
  const handleCreate = () => {
    setCreate(true);
    setModalOpen(true);
    setEdit(undefined);
    setRemove(undefined);
    setTitle("Add Tariff");
  };

  const handleEdit = (item: ElectricCarChargingTariff) => {
    setRemove(undefined);
    setEdit(item);
    setCreate(false);
    setModalOpen(true);
    setTitle("Edit Tariff");
  };

  const handleHistory = (item: ElectricCarChargingTariff) => {
    setRemove(undefined);
    setHistoryTariffs(item);
    setEdit(undefined);
    setCreate(false);
    setModalOpen(true);
    setTitle("History Tariff");
  };
  const handleInactive = () => {
    setModalDelete(true);
    setEdit(undefined);
    setCreate(false);
    setRemove("delete");
  };

  const actions: IActions[] = [
    {
      handleActions: (e: ElectricCarChargingTariff) => handleHistory(e),
      icon: <FaHistory />,
      tooltip: "History",
      title: "History",
    },
    {
      handleActions: (e: ElectricCarChargingTariff) => handleEdit(e),
      icon: <EditIcon />,
      tooltip: "Edit",
      title: "Edit",
    },
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
    entity: TariffApiServices,
    fallbackData: [],
  });

  return (
    <SelectedItemsProvider>
      <div className={`px-4 sm:px-6 lg:px-8 py-8 w-full`}>
        <HeadTable
          setCreate={handleCreate}
          setParams={setParams}
          setSearch={setSearchData}
          totalElements={totalElements}
          hiddenCreate={false}
        />

        {/* Table */}
        <GenericTable
          data={dataFormated}
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

      {/* Modal for Create/Edit */}
      <ModalBasic
        maxW="max-w-[40rem]"
        width="w-[40rem]"
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title={title}
      >
        {(create || edit) && (
          <FormTariff
            dataFormated={dataFormated}
            setDataFormated={setDataFormated}
            item={edit}
            setOpen={setModalOpen}
          />
        )}
        {historyTariffs && <HistoryTariff id={historyTariffs.id} />}
      </ModalBasic>

      {/* Modal for Delete */}
      {modalDelete && itemSelectIdTable && (
        <DeleteModal
          setDangerModalOpen={setModalDelete}
          dangerModalOpen={modalDelete}
          id={itemSelectIdTable.id}
          action={remove}
          remove={true}
          title={"Delete Tariff"}
          entity={TariffApiServices}
          key_cache={CACHE_KEYS_TABLE.TABLE_LIST_ALL}
          message={"Do you confirm to delete this tariff?"}
          messageSuccessfully={"Tariff deleted successfully"}
        />
      )}
    </SelectedItemsProvider>
  );
};

export default Tariffs;
