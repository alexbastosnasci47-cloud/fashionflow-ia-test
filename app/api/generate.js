import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const prompt = "Uma roupa estilosa para teste"; // Aqui depois podemos usar o prompt dinâmico

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512"
    });

    const imageUrl = result.data[0].url;

    res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || "Erro ao gerar imagem",
    });
  }
}
