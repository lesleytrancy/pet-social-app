import BottomNav from '@/components/front/BottomNav';

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
