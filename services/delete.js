export const DeleteUser = async (id) =>{
    const result = await fetch("http://localhost:4000/api/auth/delete-user" , {
         method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })
    return result.status;
}