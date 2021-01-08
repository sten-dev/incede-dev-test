import React from 'react'
import PropTypes from 'prop-types'
import { ServicesTemplate } from '../../templates/services'

const ServicePreview = ({ entry, widgetFor }) => (
    <ServicesTemplate
        title={entry.getIn(['data', 'title'])}
        subTitle={entry.getIn(['data', 'subTitle'])}
        image={entry.getIn(['data', 'image'])}
        content={widgetFor('body')}
    />
)

ServicePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default ServicePreview
