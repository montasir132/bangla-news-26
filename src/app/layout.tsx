import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from "../components/header/header";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin","bengali"],
});

export const metadata = {
  title: "Bangla News 26",
  description: "a digital news and media descriptor generally referring to real-time, 24/7 Bengali news updates, headlines, and portal services focusing on current affairs in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>
          <Header/>
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
