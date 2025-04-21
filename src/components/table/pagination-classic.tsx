interface PaginationClassicProps {
  total: number;
  handleBefore?: () => void;
  handleNext?: () => void;
  pageNumber: number;
  countRows: number;
  totalPages: number;
}

export default function PaginationClassic({
  ...props
}: PaginationClassicProps) {
  const disabledNext = props.pageNumber === props.totalPages;
  const disabledPrev = props.pageNumber === 1;

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <nav
          className="mb-4 sm:mb-0 sm:order-1"
          role="navigation"
          aria-label="Navigation">
          <ul className="flex justify-center">
            <li className="ml-3 first:ml-0">
              <button
                disabled={disabledPrev}
                onClick={props.handleBefore}
                className={`btn bg-transparent cursor-pointer border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 ${
                  disabledPrev ? "text-gray-400" : "text-white"
                }`}>
                Previous
              </button>
            </li>
            <li className="ml-3 first:ml-0">
              <button
                disabled={disabledNext}
                onClick={props.handleNext}
                className={`btn bg-transparent cursor-pointer border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 ${
                  disabledNext ? "text-gray-400" : "text-white"
                } `}>
                Next
              </button>
            </li>
          </ul>
        </nav>
        <div className="text-sm text-white text-center sm:text-left">
          Showing{" "}
          <span className="font-medium text-white">
            {props.pageNumber > 0
              ? props.pageNumber * props.countRows - (props.countRows - 1)
              : 0}
          </span>{" "}
          to{" "}
          <span className="font-medium text-white">
            {" "}
            {props.totalPages === props.pageNumber
              ? props.total
              : props.pageNumber
              ? props.pageNumber * props.countRows
              : 0}
          </span>{" "}
          of{" "}
          <span className="font-medium text-white">
            {props.total}
          </span>{" "}
          results
        </div>
      </div>
    </div>
  );
}
