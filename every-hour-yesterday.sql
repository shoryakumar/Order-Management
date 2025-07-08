CREATE OR REPLACE VIEW hourly_orders_yesterday AS
WITH hours AS (
  SELECT generate_series(
    DATE_TRUNC('day', NOW() - INTERVAL '1 day'),
    DATE_TRUNC('day', NOW()) - INTERVAL '1 hour',
    INTERVAL '1 hour'
  ) AS hour
),
orders_per_hour AS (
  SELECT
    DATE_TRUNC('hour', ordered_at) AS order_hour,
    COUNT(*) AS no_of_orders
  FROM "Order"
  WHERE ordered_at >= DATE_TRUNC('day', NOW() - INTERVAL '1 day')
    AND ordered_at < DATE_TRUNC('day', NOW())
  GROUP BY DATE_TRUNC('hour', ordered_at)
)
SELECT
  TO_CHAR(h.hour, 'HH12AM') || ' - ' || TO_CHAR(h.hour + INTERVAL '1 hour', 'HH12AM') AS time_slot,
  COALESCE(o.no_of_orders, 0) AS no_of_orders
FROM hours h
LEFT JOIN orders_per_hour o ON h.hour = o.order_hour
ORDER BY h.hour;