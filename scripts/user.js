import {url as endpoint} from './url.js'

const ul = document.querySelector('.list-group')
const form = document.querySelector('.form-group')

const getUser = async ()=>{
    const respuesta = await fetch(endpoint)
    const data = await respuesta.json()
    console.log(data);



    data.forEach(element => {
        const {id, nombre, url} = element
        ul.innerHTML += `
        <li class="list-group-item">
            <span class="lead">${nombre}</span>
            <img src=${url} width="50px"></img>
            <button id=${id} class="btn btn-dark btn-sm float-end">
                Borrar
            </button>
        </li>
    `
    });

}

ul.addEventListener('click' , async (e) =>{
    const btnEliminar = e.target.classList.contains('btn-dark')
    

    if(btnEliminar === true){
        const id = e.target.id
        await fetch(endpoint + id,{
            method: 'DELETE'
        })
    }
    console.log(btnEliminar);
});

const  capturarDatos = ()=>{
    const url = document.getElementById('inputUrl').value
    const nombre = document.getElementById('inputNombre').value
    const correo = document.getElementById('inputCorreo').value
    const descripcion = document.getElementById('inputDescripcion').value

    const user = {
        url,
        nombre,
        correo,
        descripcion
    }

    return user
}

form.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const objeto = capturarDatos()

    await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
})
document.addEventListener('DOMContentLoaded', getUser)

const btnCorreo = document.getElementById('btnCorreo');

btnCorreo.addEventListener('click', async ()=>{

    const input = document.getElementById('inputCorreo').value;
    const resp = await fetch(endpoint);
    const lista = await resp.json()
    const buscado = lista.find(u => u.correo.toLocaleLowerCase()  === input.toLocaleLowerCase())
    if (buscado !== undefined) {
        const {id, nombre, descripcion} = buscado;
        document.getElementById('inputUrl').value = buscado.url;
        document.getElementById('inputNombre').value = nombre;
        document.getElementById('inputDescripcion').value = descripcion;
        document.getElementById('inputId').value = id;
    } else {
        alert('Correo no encontrado')
    } 
})

btnModificar.addEventListener('click', async ()=>{

    const dataMod = capturarDatos();
    const {url, nombre,correo,descripcion} = dataMod;

    if (url === "", nombre === "", descripcion === "", correo === "") {
        alert('Llenar todos los campos')
    } else {
        const id = document.getElementById('inputId').value;
        console.log(dataMod)
        await fetch(endpoint + id,{
            method: 'PUT',
            body: JSON.stringify(dataMod),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }
})
