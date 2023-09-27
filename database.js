async function connect(){


    if(global.connection)
        return global.connection.connect(); // verficaçao se a conexao ja foi feita uma vez, se sim, retorna a conxeao


    const { Pool } = require("pg"); // pegar apenas o "pool" da lib pg
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    })

    const client =  await pool.connect(); // estabelecer a conexao entre o node e o db
    console.log("Criou o pool de conexão")

    const res = await client.query("select now();")

    console.log(res.rows[0]);

    client.release();
    global.connection =  pool;

    return pool.connect();
}


connect();


async function selectCostumers(){
    const client = await connect()
    const res = await client.query("select * from clientes;") // enviar comando sql  

    return res.rows // retornar linhas  
}
async function selectCostumer(id){
    const client = await connect()
    const res = await client.query("select * from clientes where id=$1", {id} ) // enviar comando sql com where e protecçao inject

    return res.rows // retornar linhas  
}

module.exports = {
    selectCostumers,
    selectCostumer
} // exportar para o index uma func