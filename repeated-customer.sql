CREATE VIEW repeated_customer AS
SELECT 
  c.customer_id,
  c.full_name,
  COUNT(o.order_id) AS order_count
FROM 
  "Customer" c
JOIN 
  "Order" o ON o.customer_id = c.customer_id
GROUP BY 
  c.customer_id, c.full_name
HAVING 
  COUNT(o.order_id) >= 2;