export default async function handler(req, res) {
  // Simula tempo de processamento da IA
  await new Promise((resolve) => setTimeout(resolve, 2000));

  res.status(200).json({
    success: true,
    imageUrl:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  });
}
