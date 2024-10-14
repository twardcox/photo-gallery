import PageLayout from '@/components/PageLayout';

export default function PhotosLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
