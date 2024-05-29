const express = require('express')
const  uuid = require('uuid')

const port = 3001
const app = express()
app.use(express.json())

/*

 - Query params => meusite.com/users?nome=rodolfo&age=28 // UTILIZADO PARA FILTROS Ex:google
 - Route params => /users/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO 
 - Request Body => {'name' : 'Rodolfo' , 'age' : 33}

 -Get         =>  Buscar informações no back-end 
 -Post        =>  Criar informação no back-end
 -Put/Pacth   =>  Alterar / Atualizar informação no back-end
 -Delete      =>  Deletar informação no back-end  

 -Middlware => INTERCEPTADOR => Tem o poder de parar ou alterar dados requisitados


*/

const users = []

const checkUserId = (request, response, next) => {
    
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if( index < 0) {
        return response.status(404).json ({ message: "User not found"})

    }
    
    request.userIndex = index
    request.userId = id

    next()



}


app.get('/users', (request, response) => {



    return response.json(users)
})

app.post('/users', (request, response) => {

        const { name,age} = request.body

        const user = {id:uuid.v4(), name,age}

        users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex
    const {name, age} = request.body
    const id = request.userId

    const updatedUser = {id, name, age}

    users[index] = updatedUser


return response.json(updatedUser)


})


app.delete('/users/:id', checkUserId, (request,response) => {

    const index = request.userIndex
    users.splice(index,1)
    return response.status(204).json(users)

})

app.listen(port, () => {

    console.log('  Server started')

})
