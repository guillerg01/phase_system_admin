import { GenericProperties } from "./GenericProperties";
import {
  GenericTableItemProps,
  IActions,
  IColumns,
} from "@/interfaces/interfaces";

export default function GenericTableItem({
  item,
  onCheckboxChange,
  isSelected,
  setSelectItemsTable,
  ...props
}: GenericTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(item.id, e.target.checked);
  };

  return (
    <tr>
      {/*<td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">*/}
      {/*    <div className="flex items-center">*/}
      {/*        <label className="inline-flex">*/}
      {/*            <span className="sr-only">Select</span>*/}
      {/*            <input className="form-checkbox" type="checkbox" onChange={handleCheckboxChange}*/}
      {/*                   checked={isSelected}/>*/}
      {/*        </label>*/}
      {/*    </div>*/}
      {/*</td>*/}

      {props.columns.map((col: IColumns, i: number) => {
        const { ComponentCell } = col;
        return (
          <td
            key={i}
            className={`px-2   last:pr-5 py-5 whitespace-wrap font-bold text-xs  w-auto xl:w-[${
              col.size ? col.size + "px" : "auto"
            }]`}
          >
            <div>
              {ComponentCell ? <ComponentCell item={item} /> : item[col.field]}
            </div>
          </td>
        );
      })}
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
        {props.actions && props.actions.length !== 0 && (
          <div className="space-x-1 flex items-center flex-row">
            {props.actions.map(
              (action: IActions, i: number) =>
                !action.hidden && (
                  <div className={"tooltip-container"} key={i}>
                    <button
                      onClick={() => {
                        action.handleActions(item);
                        setSelectItemsTable(item);
                      }}
                      className="cursor-pointer w-auto gap-1 hover:scale-105 transition-all flex flex-row h-[32px] text-white   rounded-[4px]  p-1"
                    >
                      <span className="tooltip-text">{action.tooltip}</span>
                      <div className="flex items-center justify-center h-[15px] w-[15px]">
                        {action.icon}
                      </div>
                    </button>
                  </div>
                )
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
