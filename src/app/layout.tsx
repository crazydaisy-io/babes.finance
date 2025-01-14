import { Lato, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/config/toast";
import { metadata } from "@/config/metadata";

const lato = Lato({
  variable: "--font-lato",
  weight: "400",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${robotoMono.variable} antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
