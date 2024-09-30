import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getDetails } from "../../service/movies-details";
import DetailsInfo from "../../components/DetailsInfo/DetailsInfo";
import { NavLink, Link, useLocation } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const { movieId } = useParams();

  // Зберігаємо адресу для кнопки "Go back"
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    async function getMoviesDetails() {
      setLoader(true);
      try {
        const response = await getDetails(movieId);
        setMovieDetails(response.data);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    getMoviesDetails();
  }, [movieId]);

  return (
    <>
      <Link to={backLinkHref} className={css.goBack}>
        Go back
      </Link>
      {loader && <Loader />}
      {error && <Error />}
      {movieDetails && <DetailsInfo details={movieDetails} />}
      <h2 className={css.title}>Additional information</h2>
      <ul className={css.ul}>
        <li>
          <NavLink to="cast" className={css.navText}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={css.navText}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
