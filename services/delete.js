export const DeleteUser = async (id) =>{
    const result = await fetch("https://novabackend-kyw2.onrender.com/api/auth/delete-user" , {
         method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })
    return result.status;
}