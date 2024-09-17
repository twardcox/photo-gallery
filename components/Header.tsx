'use client'

const Header = () => {
  return (
    <header className="header">
      <h1>Gallery</h1>
      <div>
        <h2><a href='/upload'>Upload Images</a></h2>
        <h2><a href='/'>Home</a></h2>
        <h2><a href='/gallery'>View Gallery</a></h2>
      </div>
      <div><h3><a href='/login'>Login</a></h3></div>
    </header>
  )
}

export default Header;
