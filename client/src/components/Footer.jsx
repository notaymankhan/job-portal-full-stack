import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      <img width={160} src={assets.logo} alt="" />
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @xofle.com | All right reserved.</p>
      <div className='flex gap-2.5'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img width={38} src={assets.facebook_icon} alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img width={38} src={assets.twitter_icon} alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img width={38} src={assets.instagram_icon} alt="Instagram" />
          </a>
      </div>
    </div>
  )
}

export default Footer
