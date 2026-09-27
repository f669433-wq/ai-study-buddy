
import { HfInference } from "@huggingface/inference"

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getStudyMaterial(topic, currentChat = []) {
  const previousMessages = currentChat.flatMap((chat) => [
    {
      role: "user",
      content: chat.user
    },
    {
      role: "assistant",
      content: chat.ai
    }
  ])

  const prompt = `
You are an AI Study Buddy.
Very Important:
if the user asks for your name u should always say 'AI Study Buddy' unless the user gives u a custom name 


The user's latest message is:
"${topic}"

Teach and respond in a simple, beginner-friendly way.

IMPORTANT LANGUAGE RULE:
Always respond in the same language the user used in their latest message.
If the user writes in English, respond in English.
If the user writes in French, respond in French.
If the user writes in Arabic, respond in Arabic.
Do not translate the user's question into another language unless they ask you to.
For lists of topics, do not use tables.
Use a heading for each topic followed by a short explanation.
Keep the structure clean and easy to read.

If this is the beginning of a new study topic, structure your response using Markdown with these sections:

Create a concise study-session title that captures the main subject of the user's question. Do not copy, repeat, or merely rephrase the user's question. Keep the title short (3–6 words).

## Explanation
Give a clear and easy-to-understand explanation of the topic.
Use simple examples where helpful.

## Key Points
Give 3-5 important points I should remember.
Use bullet points.

## Quick Quiz
Create 3 short questions to test my understanding.
Number the questions.
Do not give the answers immediately.

If the user is asking a follow-up question about something discussed earlier,
answer the follow-up directly and use the previous conversation to understand
what the user is referring to.

Keep explanations concise and focused.

Use Markdown headings, bullet points, numbered lists, and code blocks when
code examples are useful.

Do not use Markdown tables.
Never format information as a table.
Use bullet points or numbered lists instead.
`

  const response = await hf.chatCompletion({
    model: "openai/gpt-oss-120b:fastest",
    messages: [
      ...previousMessages,
      {
        role: "user",
        content: prompt
      }
    ]
  })

  return response.choices[0].message.content
}