const db = require('../config/config');

const User = {
    create: (user, result) => {  // Asegúrate de que la función esté correctamente definida
        const sql = `
            INSERT INTO users (
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
            VALUES(?, ?, ?, ?, ?, ?, ?, ?);
            `;

        db.query(
            sql,
            [
                user.email,
                user.name,
                user.lastname,
                user.phone,
                user.image,
                user.password,
                new Date(), // Fecha de creación
                new Date()  // Fecha de actualización
            ],
            (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    result(err, null);
                } else {
                    console.log('id del nuevo usuario:', res.insertId);
                    result(null, res.insertId);  // Devuelve el ID del nuevo usuario
                }
            }
        );
    }
};

module.exports = User;
