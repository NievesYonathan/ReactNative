const db = require('../config/config');
const bcrypt = require('bcrypt');

const User = {};

User.findById = (id, result) => {
    const sql = 'SELECT id, email, name, lastname, imag, password FROM users WHERE id = ?';

    db.query(sql,
        [id],
        (err, res) => {
            if (err) {
                console.log("Error al consultar:", err);
                result(err, null);
            } else {
                console.log("Usuario consultado:", user[0]);
                result(null, user);
            }
        }
    );
}

User.findByEmail = (email, result) => {
    const sql = 'SELECT id, email, name, lastname, imag, password FROM users WHERE email = ?';

    db.query(sql,
        [email],
        (err, res) => {
            if (err) {
                console.log("Error al consultar:", err);
                result(err, null);
            } else {
                console.log("Usuario consultado:", user[0]);
                result(null, user);
            }
        }
    );
}


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
            new Date(), 
            new Date() 
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                console.log('id del nuevo usuario:', res.insertId);
                result(null, res.insertId);  
            }
        }
    );
}

module.exports = User;