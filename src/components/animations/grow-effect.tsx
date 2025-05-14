export function GrowEffect({ children }: { children: React.ReactNode }) {
  return (
    <div className="hover:scale-102 transition-transform active:scale-95">
      {children}
    </div>
  );
}
