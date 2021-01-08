import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = imageInfo.style ? imageInfo.style : {};
  const { alt = '', childImageSharp, image } = imageInfo
  if (!!image && !!image.childImageSharp) {
    return (
      <React.Fragment>
        {image.childImageSharp.fluid.src ? (
          <img style={{ ...imageStyle, width: "100%" }} src={image.childImageSharp.fluid.src} alt={alt} />
        ) : (
            <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
          )}
      </React.Fragment>
    )
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
