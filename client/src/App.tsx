import { useEffect, useContext, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/User";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm /> <button onClick={getUsers}>Get all users</button>
      </>
    );
  }

  return (
    <div>
      <h1>
        {store.isAuth ? `User is signed in: ${store.user.email}` : "Log in!"}
      </h1>
      <button onClick={() => store.logout()}>Logout</button>
      <button onClick={getUsers}>Get all users</button>
      <div>
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    </div>
  );
}

export default observer(App);
