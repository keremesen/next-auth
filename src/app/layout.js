import AuthProvider from "./components/AuthProvider/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col  min-h-screen w-screen items-center justify-center bg-[#111] text-[#bbb] ">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
