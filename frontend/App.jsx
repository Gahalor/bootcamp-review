import { useCanister, useConnect } from "@connect2ic/react";
import React from "react"
import logo from "./assets/IC_logo_horizontal.svg"

import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"

//Import canister definitions like this:
import * as social from "../src/declarations/social"
import { IcpSocial } from "./components/Social"

function App() {
  const {principal} = useConnect();

  return (
    <div className="min-h-screen gradient-bg">
      <header className="relative flex justify-start items-center px-8 py-4 bg-slate-900/20">
        <img src={logo} width="280" alt="logo" />
        <div className="w-full">
          <h1 className="h1 text-center text-white pb-2">Usuario: {principal ? principal : "No conectado"}</h1>
        </div>

        <div className="absolute top-2 right-8">
          <ConnectButton />
        </div>
      </header>

      <div className="px-4 mt-6">
        <ConnectDialog />
        <IcpSocial />
      </div>
    </div>
  )
}

const client = createClient({
  canisters: {
    social,
  },
  providers: [
    new InternetIdentity({ providerUrl: "https://identity.ic0.app/?canisterId=be2us-64aaa-aaaaa-qaabq-cai" })
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: false,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
