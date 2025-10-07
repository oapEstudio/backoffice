import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

interface InfiniteAutocompleteProps {
  label?: string;
  fetchData: (page: number, search: string) => Promise<{ items: string[]; hasMore: boolean }>;
  onChange: (value: string | null) => void;
}

export const InfiniteAutocomplete: React.FC<InfiniteAutocompleteProps> = ({
  label = "Seleccionar",
  fetchData,
  onChange
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Cargar datos
  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchData(page, search).then(({ items, hasMore }) => {
      if (!active) return;
      setOptions((prev) => (page === 1 ? items : [...prev, ...items]));
      setHasMore(hasMore);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [page, search]);

  // Detectar scroll para cargar más
  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop <=
      event.currentTarget.clientHeight + 5;

    if (bottom && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Autocomplete
      options={options}
      onChange={(_, value) => onChange(value)}
      onInputChange={(_, value) => {
        setSearch(value);
        setPage(1); 
      }}
      ListboxProps={{
        onScroll: handleScroll,
        style: { maxHeight: 200, overflow: "auto" }
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <Loading /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};