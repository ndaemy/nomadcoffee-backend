import client from "../client";

interface MovieArgs {
  id: number;
}

const moviesResolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }: MovieArgs) => client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, year }) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};

export default moviesResolvers;
