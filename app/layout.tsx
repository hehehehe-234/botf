export const metadata = {
  title: "FB Page Bot Final",
  description: "1 admin + 1 page Facebook",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0, background: "#f6f7fb" }}>
        {children}
      </body>
    </html>
  );
}
