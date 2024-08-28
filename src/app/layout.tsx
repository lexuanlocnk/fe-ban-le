import "bootstrap/dist/css/bootstrap.min.css";
import { StyledComponentsRegistry } from "./lib/antd.registry";
import { Inter } from "next/font/google";
import AppProvider from "./lib/appProvider";
import "../../public/css/globals.css";
import "../../public/css/cssFooter.css";
import "../../public/css/detail-product.css";
import NextAuthProvider from "./lib/nextAuthProvider";
import { Viewport } from "next";
const inter = Inter({ subsets: ["vietnamese"] });

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`smoothed ${inter.className}`}>
        <StyledComponentsRegistry>
          <NextAuthProvider>
            <AppProvider>{children}</AppProvider>
          </NextAuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
