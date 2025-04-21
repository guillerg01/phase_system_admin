import { Dialog, Transition } from "@headlessui/react";

interface ModalBlankProps {
  children: React.ReactNode;
  maxW?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ModalBlank({
  children,
  isOpen,
  maxW,
  setIsOpen,
}: ModalBlankProps) {
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <Transition.Child
          className="fixed inset-0 bg-[#00000060] z-50 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
          as="div"
        />
        <Transition.Child
          className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
          as="div"
        >
          <Dialog.Panel className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-auto max-w-[380px] h-[250px] w-full max-h-full font-filson-pro-medium">
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
