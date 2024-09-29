import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Please use this link to go back home</Link>
    </>
  );
}
