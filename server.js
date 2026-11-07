import express from "express";

const port = 3000;

const app = express();
app.use(express.json());

const users = [
    {
        id: 1,
        nome: "Luis",
        email: "luis67@gmail.com",
        sexo: "masculino",
        telefone: "123456789"
    } ,
    
    {
        id: 2,
        nome: "Adriana",
        email: "adriana@gmail.com",
        sexo: "feminino",
        telefone: "987654321"
    }
];

// rotas

app.get("/users", (req, res) => {
    res.status(200).json({
        massage: "Usuários retornados com sucesso",
        data: users
    })
});

app.post("/users", (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const sexo = req.body.sexo;
    const telefone = req.body.telefone;
    // const {nome, email, sexo, telefone} = req.body;
    const newUser = {
        id: users.length + 1,
        nome: nome,
        email: email,
        sexo: sexo,
        telefone: telefone
    };
    users.push(newUser);
    res.status(201).json({
        message: "Usuario registrado com sucesso"
    })
});

app.delete(`/users/:id`, (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((u) => { return u.id == id });

    if(userIndex == -1){
        return res.status(404).json({
            message: "Usuário não encontrado"
        })
    }

    users.splice(userIndex, 1);

        return res.status(200).json({
            message: "Usuário deletado com sucesso"
        })
})

app.put("/users/:id", (req,res) => {
    const id = req.params.id;
    const user = users.find((u) => {
        return u.id == id
    });

    if(!user){
        return res.status(404).json({
            error: "Usuário não encontrado"
        })
}

    const {nome, email, sexo, telefone } = req.body;
    user.nome = nome;
    user.email = email;
    user.sexo = sexo;
    user.telefone = telefone;

    return res.status(200).json({
        message: "Usuário atualizado com sucesso"
    })
});

app.listen(port, () => {
    console.log(`servidor rodando em localhost:${port}`)
});