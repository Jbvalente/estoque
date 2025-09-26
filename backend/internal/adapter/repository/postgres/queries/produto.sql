-- name: CreateProduto :one
INSERT INTO produtos (
    ean, nome, descricao, marca, categoria_id, ncm, unidade, peso_kg, volume_ml, embalagem, multiplo_venda, perecivel, controla_lote, ativo
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
) RETURNING *;

-- name: GetProduto :one
SELECT * FROM produtos
WHERE id = $1 LIMIT 1;

-- name: ListProdutos :many
SELECT 
    p.*,
    pr.preco_venda,
    c.nome as categoria_nome,
    ((pr.preco_venda - cs.custo_medio_ponderado) / pr.preco_venda) * 100 as margem
FROM 
    produtos p
LEFT JOIN 
    precos pr ON p.id = pr.produto_id AND pr.tabela = 'padrao' -- Assuming 'padrao' is the default price table
LEFT JOIN 
    custos cs ON p.id = cs.produto_id
LEFT JOIN
    categorias c ON p.categoria_id = c.id
WHERE 
    p.ativo = true
ORDER BY 
    p.nome
LIMIT $1
OFFSET $2;

-- name: UpdateProduto :one
UPDATE produtos
SET 
    ean = $2,
    nome = $3,
    descricao = $4,
    marca = $5,
    categoria_id = $6,
    ncm = $7,
    unidade = $8,
    peso_kg = $9,
    volume_ml = $10,
    embalagem = $11,
    multiplo_venda = $12,
    perecivel = $13,
    controla_lote = $14,
    ativo = $15,
    updated_at = NOW()
WHERE id = $1
RETURNING *;

-- name: DeleteProduto :exec
DELETE FROM produtos
WHERE id = $1;