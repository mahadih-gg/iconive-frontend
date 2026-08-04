import { BlogDetailView } from "../components/BlogDetailView";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  return <BlogDetailView id={Number(id)} />;
}
