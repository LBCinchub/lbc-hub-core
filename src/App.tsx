import { SocialFeed } from './components/SocialFeed'
import './App.css'

function App() {
  return (
    <main className="lbc-app">
      <header className="lbc-header">
        <div className="lbc-header__wordmark">
          <span className="lbc-header__diamond" aria-hidden="true">◆</span>
          LBC Hub
        </div>
        <p className="lbc-header__tagline">Social · Marketplace · Diamond Standard</p>
      </header>

      <div className="lbc-feed-wrapper">
        <SocialFeed />
      </div>
    </main>
  )
}

export default App
