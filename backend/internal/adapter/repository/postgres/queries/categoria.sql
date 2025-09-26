-- name: ListCategorias :many
SELECT * FROM categorias
WHERE ativo = true
ORDER BY nome;
