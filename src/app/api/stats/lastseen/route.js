import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // TODO: Replace with Cosmos DB query
    // Example Cosmos DB query:
    // const container = cosmosClient.database('wildlife').container('stats');
    // const { resources } = await container.items
    //   .query({
    //     query: 'SELECT * FROM c WHERE c.StatType = "Tag" ORDER BY c.ImageDate DESC'
    //   })
    //   .fetchAll();
    // return NextResponse.json(resources);

    // For now, read from sample JSON file
    const filePath = path.join(process.cwd(), 'sample-data', 'stats-lastseen.json');
    const fileContents = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data, {
      headers: {
        'Vary': 'Accept-Language',
      },
    });
  } catch (error) {
    console.error('Error fetching last seen stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch last seen statistics' },
      { status: 500 }
    );
  }
}
