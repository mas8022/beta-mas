import secretFetch from "@/utils/fetchers/secretFetch";
import { useQuery } from "@tanstack/react-query";

const useGetTasks = () => {
  const fetcher = async () => await secretFetch.get("/api/tasks");

  const { data, isPending } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: fetcher,
  });

  return { data, isPending };
};

export default useGetTasks;
