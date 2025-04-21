"use client";
import React, { Dispatch, SetStateAction } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import EntityApiService from "@/services/EntityApiService";
import { notify } from "@/utils/toast_hot/toastify";
import ModalBlank from "./modal-blank";

interface IProps {
  dangerModalOpen: boolean;
  setDangerModalOpen: Dispatch<SetStateAction<boolean>>;
  message?: string;
  messageSuccessfully?: string;
  title?: string;
  id: string;
  action?: string;
  maxW?: string;
  key_cache: string | string[];
  entity: EntityApiService<any>;
  remove?: boolean;
  nameDeleted?: string;
  setStatus?: Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
  custom?: any;
  nameCustom?: string;
}

function DeleteModal({
  dangerModalOpen,
  setDangerModalOpen,
  message,
  title,
  id,
  key_cache,
  maxW,
  entity,
  remove,
  nameDeleted,
  messageSuccessfully,
  setStatus,
  handleClose,
  custom,
  nameCustom,
}: IProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return entity.delete(id);
    },
    onSuccess: () => {
      notify(
        "success",
        messageSuccessfully ? messageSuccessfully : "Deleted item successfully"
      );
      if (typeof key_cache === "string") {
        queryClient.invalidateQueries({ queryKey: [key_cache] });
      } else {
        key_cache.forEach((ke, i) => {
          queryClient.invalidateQueries({ queryKey: [ke] });
        });
      }

      setDangerModalOpen(false);
      handleClose && handleClose();
    },
    onError: (error: any) => {
      notify("error", `${error.response?.data?.message}`);
    },
  });

  const handleUpdate = () => {
    mutation.mutate();
  };

  return (
    <div className="m-1.5">
      {/* Start */}
      <ModalBlank
        isOpen={dangerModalOpen}
        maxW="max-w-[50rem]"
        setIsOpen={setDangerModalOpen}
      >
        <div className="p-5 flex flex-col justify-center items-center w-full space-x-4">
          {/* Icon */}
          {remove && (
            <div className="w-10 h-10  flex items-center justify-center shrink-0 ">
              <svg
                className=""
                width="15"
                height="18"
                viewBox="0 0 15 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 6V16H3.5V6H11.5ZM10 0H5L4 1H0.5V3H14.5V1H11L10 0ZM13.5 4H1.5V16C1.5 17.1 2.4 18 3.5 18H11.5C12.6 18 13.5 17.1 13.5 16V4Z"
                  fill="black"
                />
              </svg>
            </div>
          )}
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-2xl text-center font-bold text-black dark:text-slate-100 font-filson-pro-bold">
                {title}
              </div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2 text-[1rem] text-white font-medium text-center font-filson-pro-bold">
                <p>{message ?? `Are you sure you want to delete this item?`}</p>
                {nameDeleted && <p>{nameDeleted}</p>}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-center space-x-2">
              <button
                className="btn-sm cursor-pointer hover:bg-[#000000]/20 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 w-[78px] h-[37px] rounded-[8px]"
                onClick={() => {
                  setDangerModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-sm w-[78px] hover:bg-[#000000]/80 cursor-pointer h-[37px] bg-[#00000070] rounded-md  backdrop-blur-sm text-white "
                onClick={handleUpdate}
              >
                {nameCustom ?? "Delete"}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
      {/* End */}
    </div>
  );
}

export default DeleteModal;
