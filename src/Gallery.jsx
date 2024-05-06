import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchValue } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchValue],
    queryFn: async () => {
      const response = await axios.get(`${url}&query=${searchValue}`);
      return response.data;
    },
    // queryFn: () => axios.get(url),
  });
  console.log(response);

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>Something went wrong</h4>
      </section>
    );
  }

  const result = response.data.results;

  if (result < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {result.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            key={item.id}
            src={url}
            className="img"
            alt={item.alt_description}
          />
        );
      })}
    </section>
  );
};

export default Gallery;
