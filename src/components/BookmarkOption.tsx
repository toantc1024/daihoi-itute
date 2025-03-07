"use client";
import { useLocation } from '@/contexts/LocationContext';
import { useRouter } from 'next/navigation';
import React from 'react';

interface BookmarkOptionProps {
  title: string;
  text: string;
  icon: React.ReactNode;
  eventHandler: () => void;
  requireLocation?: boolean;
}

const BookmarkOption = ({ title, text, icon, eventHandler, requireLocation = false }: BookmarkOptionProps) => {
  const { isNearby } = useLocation();
  const router = useRouter();

  const handleClick = () => {
    if (requireLocation && !isNearby) {
      (document.getElementById('location_alert') as HTMLDialogElement)?.showModal();
      return;
    }
    eventHandler();
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition "
      >
        <div className="p-4 md:p-6">
          <div className="flex gap-5">
            <span className="text-2xl">{icon}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{title}</h3>
              <p className="mt-2 text-gray-600">{text}</p>
            </div>
          </div>
        </div>
      </div>

      <dialog id="location_alert" className="modal">
        <div className="modal-box">
          <div role="alert" className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Bạn ở quá xa Hội trường để điểm danh. Vui lòng di chuyển đến gần Hội trường và thử lại.</span>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Đóng</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BookmarkOption;
