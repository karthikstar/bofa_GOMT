import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { NextUIProvider } from '@nextui-org/react';


function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
    </SessionContextProvider>
  )
}
export default MyApp

