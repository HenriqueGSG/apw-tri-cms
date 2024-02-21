// @ts-nocheck
"use strict";

const jwt = require("jsonwebtoken"); // Certifique-se de ter instalado a biblioteca jwt

module.exports = {
  async loginWithToken(ctx) {
    try {
      const { APW_OAUTH_USER_DATA } = ctx.request.body;
      // console.log(ctx.request.body);
      if (!APW_OAUTH_USER_DATA) {
        return ctx.throw(400, "Token não fornecido");
      }

      // Decodifica o token

      const decoded = jwt.decode(APW_OAUTH_USER_DATA); // Substitua 'your_secret_key' pela sua chave secreta
      console.log(decoded, "decoded");
      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "funciId" in decoded
      ) {
        const userId = decoded.funciId;

        // Verifica se o usuário existe ou cria um novo
        let user = await strapi.entityService.findMany("api::user.user", {
          filters: { funciId: userId },
          // Pode incluir 'populate' se precisar preencher relações
        });
        console.log(user, "USER");
        if (user.length === 0) {
          // Exemplo de como criar um novo usuário, ajuste de acordo com sua lógica e modelo
          user = await strapi.entityService.create("api::user.user", {
            data: {
              funciId: userId,
              // outros dados
            },
          });
        } else {
          user = user[0]; // Ajuste conforme necessário, assumindo que findMany retorna uma array
        }

        // Sanitiza e retorna o usuário

        console.log(user);
        return (ctx.body = user);
      }
    } catch (err) {
      ctx.throw(400, "Erro ao processar o token");
    }
  },
};
