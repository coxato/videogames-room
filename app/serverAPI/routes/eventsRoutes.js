const router = require("express").Router() ;
const EventoService = require("../services/eventoService");

// ############# eventos ##############
// crear evento
router.post('/create/event', async ( req, res ) => {
    const service = new EventoService();
    let createdId = await service.crearEvento(req.body);
    console.log(`evento creado, _id: ${createdId}`);
    res.send(createdId);
})
// obtener eventos
router.get("/eventos", async (req, res) => {
    const service = new EventoService();
    let eventos = await service.getEventos();
    res.send(eventos);
})

// actualizar eventos
router.put("/update/event", async (req, res) => {
    const service = new EventoService();
    const updated = await service.updateEvent(req.body._id, req.body);
    res.send(updated);
});

// eliminar eventos
router.delete('/delete/event/:id', async (req, res) => {
    const service = new EventoService();
    const deleted = await service.deleteEvent(req.params.id);
    res.status(200).send('evento borrado')
    return;
}) 
// ####################################

module.exports = router;