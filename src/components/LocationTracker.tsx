"use client";
import React, { useEffect, useState } from 'react';
import { Wait } from './Wait';
import { useRouter } from 'next/navigation';
import { useLocation } from '@/contexts/LocationContext';

interface LocationState {
  isNearby: boolean;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean | null;
}

const TARGET_LOCATION = {
  lat: 10.851595801448353,
  lng: 106.77205977483486,
  radius: 200, // Bán kính trong mét
  name: "Hội trường lớn khu A"
};

const LocationTracker = () => {
  const router = useRouter();
  const { setIsNearby } = useLocation();
  const [state, setState] = useState<LocationState>({
    isNearby: false,
    isLoading: true,
    error: null,
    hasPermission: null
  });

  // Tính khoảng cách giữa 2 điểm theo công thức Haversine
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Bán kính trái đất trong mét
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Khoảng cách trong mét
  };

  const requestLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      
      if (result.state === 'granted') {
        setState(prev => ({ ...prev, hasPermission: true }));
        return true;
      } else if (result.state === 'prompt') {
        // Hiển thị hộp thoại xác nhận tùy chỉnh
        const userChoice = window.confirm(
          "Để sử dụng ứng dụng, bạn cần cho phép truy cập vị trí. Bạn có muốn bật GPS không?"
        );

        if (userChoice) {
          // Thử yêu cầu quyền truy cập vị trí
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setState(prev => ({ ...prev, hasPermission: true }));
          return true;
        } else {
          setState(prev => ({ ...prev, hasPermission: false }));
          return false;
        }
      } else {
        setState(prev => ({ ...prev, hasPermission: false }));
        return false;
      }
    } catch (error) {
      setState(prev => ({ ...prev, hasPermission: false }));
      return false;
    }
  };

  useEffect(() => {
    let watchId: number;

    const startWatching = async () => {
      if (!navigator.geolocation) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: "Trình duyệt của bạn không hỗ trợ định vị"
        }));
        return;
      }

      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: "Bạn cần bật GPS để sử dụng ứng dụng"
        }));
        return;
      }

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            TARGET_LOCATION.lat,
            TARGET_LOCATION.lng
          );

          const isNearby = distance <= TARGET_LOCATION.radius;
          
          setIsNearby(isNearby);
          setState(prev => ({
            ...prev,
            isNearby,
            isLoading: false,
            error: null
          }));
        },
        (error) => {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: "Không thể lấy vị trí của bạn. Vui lòng bật định vị và cấp quyền cho trang web."
          }));
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    };

    startWatching();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [setIsNearby]);

  // Nếu người dùng từ chối quyền truy cập vị trí
  if (state.hasPermission === false) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Yêu cầu quyền truy cập vị trí
          </h3>
          <p className="text-gray-600 mb-6">
            Bạn cần bật GPS và cho phép truy cập vị trí để sử dụng ứng dụng. 
            Vui lòng bật GPS trong cài đặt thiết bị của bạn và làm mới trang.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-dhblue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Làm mới trang
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.isLoading) {
    return <Wait message="Đang xác định vị trí..." />;
  }

  if (state.error) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow-lg">
        {state.error}
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-xl shadow-lg transition-all duration-300 z-1000 ${
      state.isNearby ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-yellow-100 text-yellow-700 border border-yellow-400'
    }`}>
      {state.isNearby
        ? `Bạn đã đến ${TARGET_LOCATION.name}`
        : `Bạn đang ở xa ${TARGET_LOCATION.name}`
      }
    </div>
  );
};

export default LocationTracker; 