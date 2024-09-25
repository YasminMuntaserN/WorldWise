import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchParams] = useSearchParams(); // <-- use useSearchParams instead of useParams
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}

export default useUrlPosition;
