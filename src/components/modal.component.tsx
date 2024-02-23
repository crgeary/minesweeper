import { Dialog } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { ReactNode } from "react";
import { Paper } from "./paper.component";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

export function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-white/80" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="w-full max-w-sm">
          <Paper>
            <div className="border-b-2 border-b-black flex">
              <Dialog.Title className="font-medium leading-none p-4">New Game</Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto p-4 border-l-2 border-black"
              >
                <FaTimes />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div>{children}</div>
          </Paper>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
