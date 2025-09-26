-- name: GetUserByEmail :one
SELECT * FROM usuarios
WHERE email = $1 LIMIT 1;
