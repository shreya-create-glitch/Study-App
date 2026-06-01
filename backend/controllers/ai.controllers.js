const aiService = require("../services/ai.services");
const { redisClient } = require("../config/redis");

module.exports.getResponse = async (req, res) => {
  try {
    const code = req.body.prompt;

    if (!code) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const cacheKey = `ai:${code.trim().toLowerCase()}`;

    let cachedResponse = null;

    // Redis se answer nikalne ki try
    if (redisClient.isOpen) {
      cachedResponse = await redisClient.get(cacheKey);
    }

    if (cachedResponse) {
      console.log("Cache HIT");
      return res.send(cachedResponse);
    }

    console.log("Cache MISS");

    // AI call
    const response = await aiService(code);

    // Redis me save
    if (redisClient.isOpen) {
      await redisClient.set(cacheKey, response, {
        EX: 60 * 60 * 24, // 24 hours
      });
    }

    return res.send(response);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};