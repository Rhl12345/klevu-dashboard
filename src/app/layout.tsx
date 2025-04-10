import ErrorBoundary from "@/components/common/ErrorBoundary";
import Toast from "@/components/toastify/Toast";
import { Inter, Roboto } from "next/font/google";
import "@/styles/style.css";
import "@/styles/custom.css";
import WrapperLayout from "@/components/common/WrapperLayout";
const inter = Inter({ subsets: ["latin"] });

// Initialize the font
const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// Add metadata export for better SEO and performance
export const metadata = {
  title: "Redefine Solutions",
  description: "Redefine Solutions Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className}bg-gray-100 ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function initializeTheme() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  
                  if (shouldUseDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (error) {
                  console.warn('Failed to initialize theme:', error);
                }
              })();
            `,
          }}
        />
        <title>Redefine Solutions</title>
        <link
          rel="shortcut icon"
          href="https://www.redefinesolutions.com/resources/assets/library/favicon.png"
          type="image/x-icon"
        ></link>
      </head>
      <body
        className="bg-body-light dark:bg-body-dark"
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <div className="">
            <Toast />
            <WrapperLayout>
              {children}
            </WrapperLayout>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
