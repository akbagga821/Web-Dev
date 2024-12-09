SELECT t_name, s_name, s_capacity 
FROM teams 
INNER JOIN stadiums ON stadiums.s_id=teams.t_stadium 
WHERE t_conference='NFC' AND t_division='East'
ORDER BY s_capacity;