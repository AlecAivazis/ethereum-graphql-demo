import fs from 'fs'
import path from 'path'
import schema from '../src/schema.js'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  var result = await (graphql(schema, introspectionQuery))
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    )
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../schema.json'),
      JSON.stringify(result, null, 2)
    )
  }

  process.exit()
})()