import Fetch from "@/utils/fetchers/Fetch";
import { useQuery } from "@tanstack/react-query";

const useGetQuestions = (category) => {
  const fetcher = async () => await Fetch.get(`/api/quiz/${category}`);

  const { data } = useQuery({
    queryKey: ["my-offline-questions"],
    queryFn: fetcher,
  });

  return { data };
};

export default useGetQuestions;
