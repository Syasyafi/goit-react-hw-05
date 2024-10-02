import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movie }) {
  const location = useLocation();
  return (
    <>
      <ul>
        {movie.map((item) => (
          <li key={item.id}>
            <Link
              to={`/movies/${item.id}`}
              state={location}
              className={css.text}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
