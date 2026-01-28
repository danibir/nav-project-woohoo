
const form = document.querySelector("#sign-in")
const errorDiv = document.querySelector(".error")
form.addEventListener("submit", async(e)=>{
    e.preventDefault()
    const username = form.username.value;
    const passwd = form.passwd.value;
    const key = form.key.value;
    try{
        const res = await fetch("/sign-in",{
        method: "POST",
        body: JSON.stringify({username, passwd, key}),
        headers: {"Content-Type": "application/json"}
    })

    const data = await res.json()

    if(data.err){
        console.log(data.err)
        errorDiv.innerHTML = `${data.err}`
    }


    }catch(err){
        console.log(err)
    }
})