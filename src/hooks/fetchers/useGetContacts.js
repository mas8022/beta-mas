"use client";

import secretFetch from "@/utils/fetchers/secretFetch";
import { useQuery } from "@tanstack/react-query";

const useGetContacts = () => {
  const fetcher = async () => await secretFetch.get("/api/user/me-contact");

  const { data, isPending } = useQuery({
    queryKey: ["my-contacts"],
    queryFn: fetcher,
  });

  return { data, isPending };
};

export default useGetContacts;
