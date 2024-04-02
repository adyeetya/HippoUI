import VerifyEmail from '@/components/VerifyEmail'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const page = ({ searchParams }: PageProps) => {
  const token = searchParams.token
  const toEmail = searchParams.to
  // we cant do this because verify email is not a client side component and useSearchParams only works in client side in server side comp we need to use this method
  // const page = () => {
  //   const searchParams = useSearchParams()
  //   const token = searchParams.get('token')
  //   const toEmail = searchParams.get('to')
  //   console.log(token, toEmail)
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="flex mx-auto w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === 'string' ? (
          // here we verify the email
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                fill
                alt="hippo email sent image"
              />
            </div>

            <h3 className="font-semibold text-2xl">Check your email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{' '}
                <span className="font-semibold">{toEmail}</span>
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default page
