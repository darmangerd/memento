// Owen Gombas and David Darmanger

// 1 - Trouver l'acteur (actrice) qui a participé au plus grand nombre de films
MATCH(a:Person)-[r:ACTED_IN]->(m:Movie)
RETURN a.name as actor, count(distinct m) as number_of_films
ORDER BY number_of_films DESC LIMIT 1

// 2 - Trouver la paire acteur-directeur la plus fréquente (on peut avoir plusieurs paires équivalentes)
MATCH(d:Person)-[r1:DIRECTED]->(m:Movie)<-[r:ACTED_IN]-(a:Person)
WITH [d.name](http://d.name/) + ", " + [a.name](http://a.name/) as combinaison
RETURN combinaison, count(combinaison) as count
ORDER BY count DESC

// 3 - Trouver tous les films joués par Carrie-Anne Moss et produits par Joel Silver
MATCH(a:Person)-[r1:ACTED_IN]->(m:Movie)<-[r:PRODUCED]-(p:Person)
WHERE a.name = "Carrie-Anne Moss" AND p.name = "Joel Silver"
RETURN m

// 4 - Trouver le(s) chemin(s) le(s) plus court(s) acteur->film->acteur->film->...->acteur entre Matthew Fox et Carrie Fischer
MATCH
  (a1:Person {name:'Matthew Fox'}),
  (a2:Person {name:'Carrie Fisher'}),
  path = shortestPath((a1)-[:ACTED_IN*]-(a2))
RETURN path