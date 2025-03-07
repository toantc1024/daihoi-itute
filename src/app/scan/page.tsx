import LocationGuard from '@/components/LocationGuard';
import ScanQR from '@/components/ScanQR';

export default function ScanPage() {
  return (
    <LocationGuard>
      <ScanQR />
    </LocationGuard>
  );
} 