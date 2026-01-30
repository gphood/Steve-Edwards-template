function isErycSearchCrawler() {
  const userAgent = navigator.userAgent.toLowerCase();

  const botKeywords = [
    'bot',
    'crawler',
    'spider',
    'googlebot',
    'bingbot',
    'yandexbot',
    'silktide',
    'sitesearch360'
    // Add other search crawler user agent keywords as needed
  ];

  return botKeywords.some(keyword => userAgent.includes(keyword));
}