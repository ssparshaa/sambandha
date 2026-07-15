// Nested layout - should not contain <html> or <body> tags
// Only the root app/layout.tsx should have those tags
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
