import { PublicNavbar } from "@/components/navbar/public-navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full scrollbar-hide">
      <PublicNavbar />
      {children}
    </div>
  );
};

export default PublicLayout;
