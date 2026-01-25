import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Florida Theranostics",
  description: "Get in touch with Florida Theranostics",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
