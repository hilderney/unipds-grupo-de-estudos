import "dotenv/config";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createGraph } from "./graph.js";

const sampleConversation = `
Cliente: Olá, preciso de ajuda com minha fatura.
Atendente: Bom dia! Vou verificar para você. Qual o número do pedido?
Cliente: #12345
Atendente: Encontrei. A fatura vence dia 15. Posso ajudar em mais algo?
Cliente: Não, obrigado!
`.trim();

const prompt = `
Você é um avaliador de atendimentos via WhatsApp.

Analise a conversa abaixo e responda em português com:
1. Resumo breve
2. Sentimento geral do cliente
3. Avaliação da qualidade do atendimento (1 a 5)
`.trim();

const graph = createGraph();
const result = await graph.invoke({
  messages: [
    new SystemMessage(prompt), // Define a ação.
    new HumanMessage(sampleConversation), // Conversa.
  ],
});

const lastMessage = result.messages.at(-1);
const content =
  typeof lastMessage?.content === "string"
    ? lastMessage.content
    : JSON.stringify(lastMessage?.content, null, 2);

console.log("--- Resultado da análise ---\n");
console.log(content);
