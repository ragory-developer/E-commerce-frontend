// app/(main)/layout.tsx
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
