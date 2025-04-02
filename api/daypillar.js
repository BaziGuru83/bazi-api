import { BaziCalculator } from 'bazica';

export default function handler(req, res) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Missing date parameter' });
  }

  try {
    const fullDate = new Date(`${date}T00:00:00`);
    const bazi = BaziCalculator.calculate(fullDate, 0);

    res.status(200).json({
      pillar: `${bazi.day.heavenlyStem}${bazi.day.earthlyBranch}`,
      heavenlyStem: bazi.day.heavenlyStem,
      earthlyBranch: bazi.day.earthlyBranch
    });
  } catch (e) {
    res.status(500).json({ error: 'Invalid date format or internal error' });
  }
}
