export default async function handler(req, res) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Missing date parameter' });
  }

  try {
    const { BaziCalculator } = await import('https://cdn.jsdelivr.net/gh/tommitoan/bazica@latest/dist/index.js');

    const fullDate = new Date(`${date}T00:00:00`);
    const bazi = BaziCalculator.calculate(fullDate, 0);

    return res.status(200).json({
      pillar: `${bazi.day.heavenlyStem}${bazi.day.earthlyBranch}`,
      heavenlyStem: bazi.day.heavenlyStem,
      earthlyBranch: bazi.day.earthlyBranch
    });
  } catch (err) {
    return res.status(500).json({ error: 'Calculation error', details: err.message });
  }
}
