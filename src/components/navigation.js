import Link from 'next/link'

export default function Navigation({ authorization }) {
    return (
        <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <p className="h5 my-0 me-md-auto fw-bold">Dealer<i className="fa fa-cog fa-lg" style={{ 'vertical-align': '-4px', color: '#3a87ad' }}></i>Gears</p>
          <nav className="my-2 my-md-0 me-md-3">
            <a className="p-2 text-dark" href="#">Features</a>
            <a className="p-2 text-dark" href="#">Enterprise</a>
            <a className="p-2 text-dark" href="#">Support</a>
            <a className="p-2 text-dark" href="#">Pricing</a>
          </nav>
          { authorization ? (
            <Link href={ '/vehicles' } className="btn btn-outline-primary">Vehicles</Link>
          ) : (
            <Link href={ '/' } className="btn btn-outline-primary">Login</Link>
          ) }
        </header>
    )    
}