const jwt = require ("jsonwebtoken");
const verificarToken = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
      return res.status(401).json({ msg: "Acceso denegado. Token no proporcionado." });
    }
  
    try {
      const verificado = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = verificado;
      next();
    } catch (error) {
      res.status(400).json({ msg: "Token inválido." });
    }
};
  
module.exports = verificarToken;