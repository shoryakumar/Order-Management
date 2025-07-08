CREATE VIEW weekly_orders_by_day AS
SELECT
  TO_CHAR(ordered_at, 'Day') AS weekday,
  COUNT(*) AS no_of_orders
FROM
  "Order"
WHERE
  ordered_at >= date_trunc('week', NOW() - INTERVAL '1 week')
  AND ordered_at < date_trunc('week', NOW())
GROUP BY
  TO_CHAR(ordered_at, 'Day'),
  EXTRACT(DOW FROM ordered_at)
ORDER BY
  EXTRACT(DOW FROM ordered_at);