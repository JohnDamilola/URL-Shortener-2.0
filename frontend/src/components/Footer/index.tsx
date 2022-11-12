import './styles.scss'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='footer-text-p'>
              URLShortner{' '}
              <span>
                / simple and easy-to-remember custom links from long URLs platform.
              </span>
            </div>
          </div>
          <div className='col-lg-6 footer-text-p text-right'>
            <span>Copyright © 2022. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
