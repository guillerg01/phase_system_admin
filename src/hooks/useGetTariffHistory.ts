import { useQuery } from "@tanstack/react-query";
import TariffApiServices from "@/services/TariffApiServices";

const useGetTariffHistory = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tariff-history", id],
    queryFn: () => TariffApiServices.history(id),
  });

  return { data, isLoading, error };
};

export default useGetTariffHistory;
