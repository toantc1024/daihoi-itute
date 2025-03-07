"use client";
import { useLocation } from '@/contexts/LocationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationGuardProps {
  children: React.ReactNode;
}

const LocationGuard = ({ children }: LocationGuardProps) => {
  const { isNearby } = useLocation();

  if (!isNearby) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Không thể truy cập
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn ở quá xa Hội trường để điểm danh. 
              Vui lòng di chuyển đến gần Hội trường và thử lại.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-dhblue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Quay lại
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return <>{children}</>;
};

export default LocationGuard; 