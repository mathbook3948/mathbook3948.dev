"use client";

import StTabs, { Tab } from "@/components/st/st-tabs";
import { useRouter } from "next/navigation";
import { PostWithCategory } from "@/types/post-interface";
import { Pagination } from "@/types/pagination-interface";
import UserLatest from "@/views/user/user-latest";

interface UserProps {
  tab: string;
  latestPostList: PostWithCategory[];
  pagination?: Pagination;
}

const User = ({ tab, latestPostList, pagination }: UserProps) => {
  const router = useRouter();

  const tabList: Tab[] = [
    {
      id: "latest",
      name: "최신",
      render: <UserLatest latestPostList={latestPostList} pagination={pagination} />,
    },
    {
      id: "category",
      name: "카테고리별",
      render: <div></div>,
    },
  ];

  return <StTabs tabList={tabList} tab={tab} onChange={(t) => router.push(`?tab=${t}`)} />;
};

export default User;
