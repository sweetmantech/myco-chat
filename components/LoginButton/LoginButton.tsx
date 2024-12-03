import Button from "@/components/Button";
import useLogin from "@/hooks/useLogin";

const LoginButton = () => {
  const { authenticated, loginButtonDisabled, handleEmailLogin, handleLogout } =
    useLogin();

  if (authenticated) {
    return <Button onClick={handleLogout}>Logout</Button>;
  }

  return (
    <div>
      <Button onClick={handleEmailLogin} disabled={loginButtonDisabled}>
        Login
      </Button>
    </div>
  );
};

export default LoginButton;
