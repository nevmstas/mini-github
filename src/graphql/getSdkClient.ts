import { GraphQLClient } from 'graphql-request'
import { getSdk } from './__generated__'

const getSdkClient = () => {
  const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_URL ?? '',
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  )
  const sdk = getSdk(client)
  return sdk
}

export default getSdkClient
