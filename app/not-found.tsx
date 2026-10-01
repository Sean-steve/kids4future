import Link from "next/link";

export default function NotFound(){return <main className="content-section shell"><div className="empty-state" style={{maxWidth:760,margin:"60px auto"}}><div className="program-icon" aria-hidden="true">🌈</div><strong>This path wandered off.</strong><p>The page you requested does not exist, but the FutureRise journey continues.</p><div className="hero-actions" style={{justifyContent:"center"}}><Link className="button" href="/">Go home</Link><Link className="button button-ghost" href="/programs/">Explore programs</Link></div></div></main>}
