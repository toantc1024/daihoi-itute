import LocationGuard from '@/components/LocationGuard';
import ScanQR from '@/app/scan-qr/page';

export default function ScanPage() {
  return (
    <LocationGuard>
      <ScanQR />
    </LocationGuard>
  );
} 