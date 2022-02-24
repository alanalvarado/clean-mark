
function wrap (rule) {
  return ($) => {
    let value = rule($)
    if (typeof value !== 'string') return
    // remove extra whitespace
    value = value.trim()
    // if it starts with a location, like articles sometimes do in the opening
    // paragraph, try to remove it
    value = value.replace(/^[A-Z\s]+\s+[-—–]\s+/, '')
    // Remove colon : because it interferes with YAML linters
    value = value.replace(/([:]+)/g, '')
    // Remove extra line feeds
    value = value.replace(/(\r\n|\n|\r)+/g, ' ')
    return value
  }
}

/**
 * Rules.
 */

module.exports = [
  wrap($ => $('meta[property="og:description"]').attr('content')),
  wrap($ => $('meta[name="twitter:description"]').attr('content')),
  wrap($ => $('meta[name="description"]').attr('content')),
  wrap($ => $('meta[name="sailthru.description"]').attr('content')),
  wrap($ => $('meta[itemprop="description"]').attr('content')),
  wrap($ =>
    $('[class*="content"] > p')
      .first()
      .text()
  ),
  wrap($ =>
    $('[class*="content"] p')
      .first()
      .text()
  )
]
