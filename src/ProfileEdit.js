import { useEffect, useState } from "react"

function ProfileEdit({ userID }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({});
    const abortController = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userID}`,
          { signal: abortController.signal }
        );
        const userFromAPI = await response.json();
        setUser(userFromAPI);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted', userID);
        } else {
          throw error;
        }
      }
    }  
    loadUsers();

    return () => {
      console.log('cleanup', userID);
      abortController.abort();
    };
  }, [userID]); // Passing [] so that it only runs the effect once

  useEffect(() => {
    if (user.name) {
      document.title = `${user.name} : Edit Profile`;
    } else {
      document.title = "Edit Profile";
    }
  }, [user]); // Rerun this effect when the user changes

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(user),
      }
    );
    const savedData = await response.json();
    console.log("Saved user!", savedData);
  };

  if (user.id) {
    return (
      <form name="profileEdit" onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            id="username"
            name="username"
            type="text"
            required={true}
            value={user.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required={true}
            value={user.email}
            onChange={changeHandler}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    );
  }
  return "Loading...";
}

export default ProfileEdit