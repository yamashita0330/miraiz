import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { findDemoPartner } from '@/lib/demo';
import { BookingFlow } from './BookingFlow';

export default function BookPartnerPage({ params }: { params: { id: string } }) {
  const partner = findDemoPartner(params.id);
  if (!partner) notFound();

  return (
    <>
      <Header showLogout />
      <BookingFlow partner={partner} />
      <BottomNav />
    </>
  );
}
