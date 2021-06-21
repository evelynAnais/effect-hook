import React, { useEffect, useState } from "react";

function ProfileEdit({ userID }) {  // Added `userID` as a prop
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUser() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
      const userFromAPI = await response.json();
      setUser(userFromAPI);
    }

    loadUser();
  }, [userID]);  // <-- Added dependency on `userID`

  ... // Omitted for brevity
}


export default ProfileEdit;