const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error al consultar.",
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: "El email no existe en la BD.",
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password); //Comparacion de contraseñas
            
            if (isPasswordValid) {
                const token = jwt.sign({
                    id: myUser.id,
                    email: myUser.email
                }, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    email: myUser.email,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    image: myUser.image,
                    phone: myUser.phone,
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
