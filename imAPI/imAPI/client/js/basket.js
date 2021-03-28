try {
    const response = await fetch('http://localhost:3001/store/getAll', { method: "GET", credentials: 'include', headers: { Cookie: document.cookie, } });
    if (response.ok) {
        return response.json()
    } else {
        window.location.href = '/redirect'
    }
}catch(error){
    throw new Error('Server Down')
}


