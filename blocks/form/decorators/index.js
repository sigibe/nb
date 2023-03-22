import decorateSummary from './summary.js';

export default async function decorateForm(formTag, config) {
  const id = formTag.id.toLowerCase();
  if (id === 'repayments-calculator' || id === 'loanconsolidate-calculator') {
    const decorateRepaymentsCalculator = (await import(`./${id}.js`)).default;
    decorateRepaymentsCalculator(formTag);
  }
  if (config.summary) {
    const summarySection = document.querySelector(`[data-id= "${config.summary}"]`);
    decorateSummary(formTag, summarySection);
  }
}
