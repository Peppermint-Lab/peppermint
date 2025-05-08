import { useRouter } from "next/router";
import { useUser } from "../../../store/session";

class AuthService {
  static checkUserAuthentication() {
    const location = useRouter();
    const { user } = useUser();

    if (!user) {
      location.push("/auth/login");
    } else if (location.pathname.includes("/admin") && !user.isAdmin) {
      location.push("/");
      alert("You do not have the correct permissions for that action.");
    } else if (user.external_user) {
      location.push("/portal");
    }
  }
}
