const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="h-full w-full scrollbar-hide">{children}</div>
    </div>
  );
};

export default PublicLayout;
