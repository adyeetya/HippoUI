import { User } from '../payload-types'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'

export const getServerSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
  // this token is sent by the payload server after the user signs in it contains the info of the user
  const token = cookies.get('payload-token')?.value

  //  this endpoint is provided by the cms to fetch the user thats logged in with the help of the token in header
  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  )

  const { user } = (await meRes.json()) as { user: User | null }
  //   setting up the type of the  user as the User in the collection type

  return { user }
}
