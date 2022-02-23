const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getDisciplinas = (request, response) => {
    pool.query('SELECT * FROM disciplinas', (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro ao recuperar as disciplinas: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

const addDisciplina = (request, response) => {
    const { nome, descricao, curso, cargahoraria, status } = request.body

    pool.query(
        'INSERT INTO disciplinas (nome, descricao, curso, cargahoraria, status) VALUES ($1, $2, $3, $4, $5)',
        [nome, descricao, curso, cargahoraria, status],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao adicionar a disciplina: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Disciplina criada.' })
        },
    )
}

const updateDisciplina = (request, response) => {
    const { id, nome, descricao, curso, cargahoraria, status } = request.body
    pool.query('UPDATE disciplinas set nome=$1, descricao=$2, curso=$3, cargahoraria=$4, status=$5 where id=$6',
        [nome, descricao, curso, cargahoraria, status, id], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar a disciplina: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Disciplina atualizada.' })
        })
}

const deleteDisciplina = (request, response, next) => {
    const id = parseInt(request.params.id)
    pool.query(
        'DELETE from disciplinas where id=$1',
        [id],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possivel remover a disciplina' });
            }
            response.status(201).json({ status: 'success', 
            message: 'Disciplina removida com sucesso' })
        },
    )
}

const getDisciplinaPorID = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM disciplinas where id = $1',
        [id], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ status: 'error', 
            message: 'Não foi possivel recuperar a disciplina' });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/disciplinas')
    // GET endpoint
    .get(getDisciplinas)
    // POST endpoint
    .post(addDisciplina)
    // PUT
    .put(updateDisciplina)  

app.route('/disciplinas/:id')
    .get(getDisciplinaPorID) 
    .delete(deleteDisciplina) 


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando`)
})