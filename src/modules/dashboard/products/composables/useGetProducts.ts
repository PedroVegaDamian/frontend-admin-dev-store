import { useQuery } from "@pinia/colada";
import type { Ref } from "vue";
import { type QueryParams, getProducts } from "../services";

export const useGetProducts = (queryParams: Ref<Required<QueryParams>>) => {
  const {
    error,
    refresh,
    isLoading,
    data: products,
  } = useQuery({
    key: () => ["products", queryParams.value],
    query: () => getProducts(queryParams.value),
    staleTime: 0,
    refetchOnWindowFocus: false,
    placeholderData: {
      data: [],
      total: 0,
    },
  });

  return {
    error,
    refresh,
    products,
    isLoading,
  };
};
