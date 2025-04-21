import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface ModalBasicProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  maxW?: string;
  width?: string;
  onClose?: () => void;
}

export default function ModalBasic({
  children,
  title,
  isOpen,
  setIsOpen,
  maxW,
  width,
  onClose,
}: ModalBasicProps) {
  return (
    <Transition show={isOpen}>
      <Dialog
        onClose={() => (onClose ? onClose : setIsOpen(false))}
        className="relative z-50"
      >
        {/*
        Use one `TransitionChild` to apply one transition
        to the backdrop...
      */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#00000000] backdrop-blur-sm" />
        </TransitionChild>

        {/*
        ...and another `TransitionChild` to apply a separate
        transition to the contents.
      */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              className={` bg-[#00000060] rounded-2xl shadow-lg overflow-auto 
              ${maxW ? maxW : "max-w-lg"} ${width ? width : "w-40"} max-h-full`}
            >
              {/* Modal header */}
              <div className="px-5 pt-4 pb-2 ">
                <div className="flex justify-between items-center">
                  <DialogTitle className="font-bold font-filson-pro-bold text-3xl text-[#051220] dark:text-slate-100">
                    {title}
                  </DialogTitle>
                  <button
                    className="text-white hover:text-slate-500 dark:hover:text-slate-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  >
                    <div className="sr-only">Close</div>
                    <svg className="w-4 h-4 fill-current">
                      <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                    </svg>
                  </button>
                </div>
              </div>
              {children}
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
