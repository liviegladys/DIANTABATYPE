


    const btn = document.querySelector('#sub');
    
    btn.addEventListener('click', async (e) =>{
        e.preventDefault()
        const mail = document.querySelector('#email');
        const pass = document.querySelector('#password');
    
        const user = {
            Email: mail.value,
            Password : pass.value
        }
        const userJson = JSON.stringify(user)
        const option = {
            method : "POST",
            headers : {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin':'http://localhost:3001'
                
            },
            body : userJson,
            
        }
        console.log(option)
        
        const res = await fetch("http://localhost:3001/client/login", option)
        if(res.ok){
            const json = await res.json()
         const cookie = await sessionStorage.setItem('token', json.accessToken)
         window.location.href= "basket.html"

        }else{
            alert('Utilisateur inconnu')
    
        }
    })
    
  