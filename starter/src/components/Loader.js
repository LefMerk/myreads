import { InfinitySpin } from "react-loader-spinner";

export default function Loader() {
    return(
        <div className="overlay">
            <div className="overlay-spinner">
                <InfinitySpin width='200' color="#fff" />
            </div>
        </div>
    );
}