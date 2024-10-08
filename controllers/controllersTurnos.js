const Cliente = require("../models/cliente");
const Turno = require("../models/turno");
const UserAdmin=require("../models/user")
const Break=require("../models/break")
// si no coloco el async y el await se enviara a la consola respuestas antes
// de terminar de hacer la bsusqueda por completo de la BD y tirara errores
// busqueda de todos los registros que existen en la BD

const addTurno = async (req, res, next) => {
  const { name, nameDog, phone, date, notesTurn, idClient, time, idDog, Company} =
    req.body;
  const turno = new Turno({
    name,
    nameDog,
    phone,
    date,
    notesTurn,
    idClient,
    time,
    idDog,
    Company
  });
  
  try {
    const cliente = await Cliente.findById(req.body.idClient);
    // console.log(cliente)
    if(!cliente){
      return res.status(204).json({
        msg:"Client not found"
      })
    }
    turno.Client = cliente;
    await turno.save();

    cliente.turnos.push(turno);
    await cliente.save();
    
    res.status(200).json({
      status: "turno agendado",
      turno
    });
  } catch (err) {
    next(err);
  }
};

const addBreak = async (req, res, next) => {
  const { date,notesBreak,ourEntry,timeBreak,idAdmin} =
    req.body;
  const breakAdmin = new Break({
    notesBreak,
    date,
    ourEntry,
    timeBreak,
    idAdmin
  });
  try {
    const userAdmin = await UserAdmin.findById(idAdmin);
    console.log(userAdmin)
    await breakAdmin.save();
    userAdmin.arrayBreaks.push(breakAdmin);
    await userAdmin.save();
    res.send(breakAdmin);
    res.status(200).json({
      status: "break agended",
    });
  } catch (err) {
    next(err);
  }
};


const deleteTurno = async (req, res) => {
  await Turno.findByIdAndRemove(req.params.id, { userFindAndModify: false })
    .then(() =>
      res.status(200).json({
        status: "TURNO ELIMINADO",
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

const editTurno = async (req, res) => {
  const { date, time, notesTurn } = req.body;
  const newTurno = {
    date,
    time,
    notesTurn,
  };
  await Turno.findByIdAndUpdate(req.params.id, newTurno, {
    userFindAndModify: false,
  });
  res.status(200).json({
    status: "turno actualizado",
  });
};

const listTurnos = async (req, res) => {
  const idCompany=req.params.id
  console.log(idCompany)
  try {
    const turnos = await Turno.find({Company:idCompany});
    
    if (turnos.length>0) {
      res.status(200).json({
        turnos,
      });
    }else{
      res.status(204).json({
        msg:"not found turnos"
      })
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  listTurnos,
  addTurno,
  deleteTurno,
  editTurno,
  addBreak
};
