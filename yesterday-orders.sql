CREATE VIEW hourly_orders_yesterday AS
SELECT
  TO_CHAR(DATE_TRUNC('hour', ordered_at), 'HH12AM') || ' - ' ||
  TO_CHAR(DATE_TRUNC('hour', ordered_at) + INTERVAL '1 hour', 'HH12AM') AS time_slot,
  COUNT(*) AS no_of_orders
FROM
  "Order"
WHERE
  ordered_at >= DATE_TRUNC('day', NOW() - INTERVAL '1 day')
  AND ordered_at < DATE_TRUNC('day', NOW())
GROUP BY
  DATE_TRUNC('hour', ordered_at)
ORDER BY
  DATE_TRUNC('hour', ordered_at);