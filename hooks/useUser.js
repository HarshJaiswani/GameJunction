import useSWR from "swr";
import { currentUser } from "../Services/User";

const useUser = () => {
  const { data, error, mutate } = useSWR("CURRENTUSER", currentUser);

  if (error) {
    return "User Not Found!";
  }
  if (!data) {
    return "Loading...";
  }
  if (data) {
    return { user: data.user, mutate };
  }
};

export default useUser;
