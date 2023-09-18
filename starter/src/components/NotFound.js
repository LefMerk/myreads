import { Link } from "react-router-dom";

export default function NotFound() {
    return(
        <div className="not-found">
            <div>Page not found!</div>
            <Link>Go to home</Link>
        </div>
    );
}