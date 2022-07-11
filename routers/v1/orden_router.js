const router = require('express').Router();
const { roleAuth } = require("../../middlewares/middleware_auth");

const { 
    guardarOrden,
    getOrden,
    getxUserID,
    getxAll,
    actualizarEstado

} =  require('../../controller/orden_controller');

router.param('idOrden', getOrden )

router.post('/orden', roleAuth(["ADMIN_ROLE", "USER_ROLE" ]),  guardarOrden);

router.get('/orden/:usuario', roleAuth(["ADMIN_ROLE", "USER_ROLE" ]), getxUserID);

router.get('/orden/', roleAuth(["ADMIN_ROLE"]), getxAll);

router.put('/orden/:idOrden', roleAuth(["ADMIN_ROLE"]), actualizarEstado);

module.exports = router;