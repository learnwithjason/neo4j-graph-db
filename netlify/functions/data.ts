import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_BOLT_URL,
  neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD),
);

export const handler = async () => {
  const session = driver.session();

  const response = await session.run(
    'MATCH (n) RETURN LABELS(n) AS labels, COUNT(n) AS count',
  );

  const records = response.records.map((record) => {
    return {
      labels: record.get('labels'),
      count: record.get('count').toNumber(),
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(records, null, 2),
  };
};
