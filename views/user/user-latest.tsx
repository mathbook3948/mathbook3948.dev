"use client";

import { PostWithCategory } from "@/types/post-interface";
import { Pagination } from "@/types/pagination-interface";
import { useEffect, useRef, useState } from "react";
import getUserPosts from "@/actions/user/post/get-user-posts";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface UserLatestProps {
  latestPostList: PostWithCategory[];
  pagination?: Pagination;
}

const UserLatest = ({ latestPostList, pagination: initPagination }: UserLatestProps) => {
  const [posts, setPosts] = useState<PostWithCategory[]>(latestPostList);
  const [pagination, setPagination] = useState<Pagination | undefined>(initPagination);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pagination?.hasNext) return;
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPagination((prev) => (prev ? { ...prev, page: prev.page + 1 } : prev));
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, pagination?.hasNext]);

  useEffect(() => {
    if (!pagination || pagination.page === initPagination?.page) return;
    if (loading) return;

    setLoading(true);
    getUserPosts({
      page: pagination.page,
      perPage: 10,
    })
      .then((p) => {
        setPosts((prev) => [...prev, ...p.items]);
        setPagination(p.pagination);
      })
      .finally(() => setLoading(false));
  }, [pagination?.page]);

  return (
    <div className="my-4">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {posts.map((post) => (
          <Card key={post.postIdx} className="p-2 rounded-sm gap-2">
            {post.thumbnail ? (
              <div className="relative w-full aspect-video rounded-sm overflow-hidden">
                <Image src={post.thumbnail} alt={post.title} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-video bg-muted rounded-sm flex items-center justify-center">
                <ImageOff />
              </div>
            )}
            <div>
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm text-muted-foreground">{post.category?.name}</p>
            </div>

            <span className="text-sm text-muted-foreground">
              {format(new Date(post.updatedAt ?? post.createdAt), "yyyy-MM-dd HH:mm")}
            </span>
          </Card>
        ))}
      </div>
      {loading && <p className="text-center py-4">Loading...</p>}
      {pagination?.hasNext && <div ref={observerRef} className="h-10" />}
    </div>
  );
};

export default UserLatest;
