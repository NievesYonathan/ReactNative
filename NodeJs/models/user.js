const db = require('../config/config');
const bcrypt = require('bcrypt');

const User = {};

User.create = async (user, result) => {
    const hash = await bcrypt.hash(user.password, 10);
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

    db.query(sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
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

module.exports = User;
