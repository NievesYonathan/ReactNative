const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../config/key");

module.exports = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, user) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error in database",
                    error: err
                });
            }

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "El email no existe en la BD.",
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password); //Comparacion de contraseñas
            
            if (!isPasswordValid) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, keys.secretOrKey, {});

                const data = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    image: user.image,
                    phone: user.phone,
                    session_token: `JWT ${token}`
                };

                return res.status(201).json({
                    success: true,
                    message: "Usuario Autenticado",
                    data: data
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }
        });
    },
    register(req, res) {
        const user = req.body;
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Error al registrar el usuario",
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: "Usuario registrado con éxito",
                data: data
            });
        });
    }
};
