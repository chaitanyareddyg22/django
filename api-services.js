
const Token = "f10a13c092672af3cf7595e117f4bdb96ebcaf40"

export default class API{

    
    static updateMovie(mov_id,bodys){
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`,{method:'PUT',headers:{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`},
            body:JSON.stringify(bodys)
        }).then(resp =>resp.json())

    }

    static createMovie(bodys){
        return fetch('http://127.0.0.1:8000/api/movies/',{method:'POST',headers:{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`},
            body:JSON.stringify(bodys)
        }).then(resp =>resp.json())

    }
}
