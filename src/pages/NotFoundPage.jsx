import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="box">
      <h1>404</h1>
      <p>No page here.</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  )
}