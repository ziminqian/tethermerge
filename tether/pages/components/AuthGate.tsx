import useSession from "./../../utils/useSession";
import Loading from "./Loading";
import Title from "../title";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();

  if (loading) return <Loading />;

  if (!session) return <Title />;

  // Logged in → show normal app
  return <>{children}</>;
}