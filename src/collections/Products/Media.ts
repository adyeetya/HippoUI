import { User } from '@/payload-types'
import { Access, CollectionConfig } from 'payload/types'

// This function is designed to determine if a user is an admin or has access to images based on their role.
const isAdminOrHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    // console.log('req.user : ', req.user)
    const user = req.user as User | undefined
    // It first extracts the user object from the request, casting it to the User type or undefined.
    if (!user) return false
    // If there is no user (!user), meaning the user is not authenticated, it returns false, indicating no access.
    if (user.role === 'admin') return true
    // If the user is an admin (user.role === 'admin'), it returns true, granting full access.
    // console.log('req.user.id', req.user.id)
    return {
      user: {
        equals: req.user.id,
      },
    }
    // This object is returned when the user is authenticated but is not an admin. It specifies an access control condition based on the ID of the user making the request.
  }

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id }
      },
    ],
  },
  //   beforeChange Hook: This hook is executed just before the data is about to be changed, such as before creating or updating a document in the collection.
  //   data: This object represents the data about to be changed. It could be the data for a new document being created or the updated data for an existing document.
  //   Return Value: The function returns a new object that includes all properties from the data object along with an added user property, which contains the ID of the user making the request. This modified data object will then be used for the subsequent operation, whether it's creating or updating a document.
  //   Usage Example: Suppose a user submits a request to create or update a document in the Media collection. This hook will intercept that request just before the change is made, extract the ID of the user making the request from req.user.id, and add it to the data object before the change is processed.
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer
      if (!req.user || !referer?.includes('sell')) {
        // if the user is not logged in ie !req.user they should see all images in the frontend
        // if the user is logged in and they are not in the backend dashboard ie /sell they should see all the images in the FE
        return true
      }
      return await isAdminOrHasAccessToImages()({ req })
    },
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
}
