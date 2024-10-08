import type { Metadata } from "next";
import "./globals.css";
// import ClientToastify from "@/components/ClientToastify";
import ThemeContainer from "@/components/ThemeContainer";

export const metadata: Metadata = {
  title: "My Tasks",
  description: "manage your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body dir="rtl">
        <ThemeContainer>
          <div className="dark:text-gray-100">
            {children}
            {/* <ClientToastify /> */}
          </div>
        </ThemeContainer>
      </body>
    </html>
  );
}
