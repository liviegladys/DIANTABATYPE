
const btn = document.querySelector('#create');
    
    btn.addEventListener('click', async (e) =>{
        e.preventDefault()
        const name = document.querySelector('#enterpriseName');
        const mail = document.querySelector('#email');
        const pass = document.querySelector('#password');
        const confirmPass = document.querySelector('#confirmPassword');
    
        const option = {
            method : "POST",
            headers : {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin':'http://localhost:3001'
                
            },
            body : JSON.stringify(),
            
        }
        console.log(option)
        
        const res = await fetch("http://localhost:3001/store/create", option)
        if(res.ok){
            const json = await res.json()
         const cookie = await sessionStorage.setItem('token', json.accessToken)
         window.location.href= "basket.html"

        }else{
            alert('Utilisateur inconnu')
    
        }
    })