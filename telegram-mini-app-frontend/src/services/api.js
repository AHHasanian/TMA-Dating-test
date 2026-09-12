// برای اجرای لوکال اعمال شود
const API_URL = "http://localhost:3001";

// برای اعمال روی هاست اعمال شود
// const API_URL = "https://telegram-mini-app.ahhasanian.workers.dev";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

export function authenticateTelegram(initData) {
  return request("/api/auth/telegram", {
    method: "POST",
    body: JSON.stringify({
      initData,
    }),
  });
}

export function createUser(userData) {
  return request("/api/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function updateUser(telegramId, userData) {
  return request(`/api/users/telegram/${telegramId}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
}

// دریافت پیشنهادهای Dating
export function getMatchSuggestions(telegramId) {
  return request(`/api/matches/${telegramId}`);
}

// Like
export function likeMatch(telegramId, targetTelegramId) {
  return request(`/api/matches/${telegramId}/like`, {
    method: "POST",
    body: JSON.stringify({
      target_telegram_id: targetTelegramId,
    }),
  });
}

// Dislike
export function dislikeMatch(telegramId, targetTelegramId) {
  return request(`/api/matches/${telegramId}/dislike`, {
    method: "POST",
    body: JSON.stringify({
      target_telegram_id: targetTelegramId,
    }),
  });
}
