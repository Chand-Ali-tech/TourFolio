import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import Loader from "./../Utils/Loader";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

function Panel() {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();
  const { loading, setLoading } = useLoading();

  if (!isLoggedIn) {
    return null;
  }

  if (!user) {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://tour-folio-backend.vercel.app/api/user/check-auth",
          {
            withCredentials: true,
          }
        );

        setUser(res.data.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }
  return loading ? (
    <Loader />
  ) : (
    <div>
      {user.role === "admin" ? <AdminPanel/> : <UserPanel />}
    </div>
  );
}

export default Panel;
