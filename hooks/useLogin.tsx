import { usePrivy } from "@privy-io/react-auth";

const useLogin = () => {
  const { ready, authenticated, login, logout } = usePrivy();

  const handleEmailLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  const disableLogin = !ready || authenticated;

  return {
    authenticated,
    loginButtonDisabled: disableLogin,
    handleEmailLogin,
    handleLogout,
  };
};

export default useLogin;
