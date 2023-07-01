import { pool } from "../db.js";


export const getEstados = async (req,res) => {

    try {
        
    
        const [tabla_completa] = await pool.query('SELECT c.codigo,c.estado, p.nombre, d.nombre as doctor, c.fecha FROM cita c JOIN paciente p ON p.dni = c.dni_paciente JOIN doctor d ON d.id = c.id_doctor order by c.codigo;')
        res.render('estado',{ tabla_completa })

        throw new Error("algo salio 1")

    } catch (error) {

        return res.status(500).json({
            massage: 'algo salio mal 1'
        })
        
    }
}

export const postEstado = async (req, res) => {
    res.redirect('estadoBuscado')
}

export const getConsultas = async (req,res) => {
    
    try {

        const [tabla_completa] = await pool.query('SELECT c.codigo,c.estado, p.nombre, d.nombre as doctor, c.fecha FROM cita c JOIN paciente p ON p.dni = c.dni_paciente JOIN doctor d ON d.id = c.id_doctor order by c.codigo;')
        res.render('consultas', {tabla_completa})
        
    } catch (error) {
        return res.status(500).json({
            massage: 'algo salio mal 2'
        })
    }

}


export const postConsultas = async (req, res) => {
    const codigo = req.body.codigo
    
    res.redirect(`miconsulta/${codigo}`)
}


export const getMiConsulta = async (req,res) => {


    try {


        const codigo = req.params.id

        const [tabla] = await pool.query('SELECT c.codigo,c.estado, p.nombre, d.nombre as doctor, c.fecha FROM cita c JOIN paciente p ON p.dni = c.dni_paciente JOIN doctor d ON d.id = c.id_doctor order by c.codigo;')

        if ( codigo > tabla.length+1 ){
            throw new Error("No existe ese codigo", {s})

        }

        const [tabla_completa] = await pool.query('SELECT c.codigo,c.estado, p.nombre, d.nombre as doctor, c.fecha FROM cita c JOIN paciente p ON p.dni = c.dni_paciente JOIN doctor d ON d.id = c.id_doctor where c.codigo = ? order by c.codigo;', [codigo])

        console.log("a: ",tabla)
        console.log("a: ",tabla.length)

        // res.send("bien")
        res.render("miconsulta", { tabla_completa })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }

}

export const getMiConsulta2 = async (req,res) => {

    try {
        const codigo = req.body.codigo
        const [tabla_completa] = await pool.query('SELECT c.codigo,c.estado, p.nombre, d.nombre as doctor, c.fecha FROM cita c JOIN paciente p ON p.dni = c.dni_paciente JOIN doctor d ON d.id = c.id_doctor where c.codigo = ? order by c.codigo;', [codigo])
        res.render("miconsulta", { tabla_completa })
    } catch (error) {
        return res.status(500).json({
            massage: 'algo salio mal 4'
        })
    }

}