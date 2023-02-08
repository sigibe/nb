const supportedUnits = ['month', 'year'].join('|');

const ShorthandStyles = [/^currency(?:\/([a-zA-Z]{3}))?$/, /^percent$/, new RegExp(`^unit/(${supportedUnits})$`)];

function parseNumberSkeleton(skeleton) {
  const options = {};
  let match; let
    index;
  for (index = 0; index < ShorthandStyles.length && match == null; index += 1) {
    match = ShorthandStyles[index].exec(skeleton);
  }
  if (match) {
    switch (index) {
      case 1: // currency
        options.style = 'currency';
        options.currencyDisplay = 'narrowSymbol';
        // eslint-disable-next-line prefer-destructuring
        options.currency = match[1];
        break;
      case 2:
        options.style = 'percent';
        options.maximumFractionDigits = 2;
        break;
      case 3:
        options.style = 'unit';
        options.unitDisplay = 'long';
        // eslint-disable-next-line prefer-destructuring
        options.unit = match[1];
        break;
      default:
    }
  }
  return options;
}

export default function formatNumber(num, format, language = 'en-US') {
  const options = parseNumberSkeleton(format);
  return new Intl.NumberFormat(language, options).format(num);
}
