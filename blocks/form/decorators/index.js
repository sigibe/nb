import decorateSummary from './summary.js';

export default async function decorateForm(formTag, { form, fragments }, config) {
  const id = formTag.id.toLowerCase();
  if (id === 'repayments-calculator' || id === 'loanconsolidate-calculator') {
    const filePath = './calculator.js';
    (await import(filePath)).default(formTag, { form, fragments });
  }
  if (config.summary) {
    const summarySection = document.querySelector(`[data-id= "${config.summary}"]`);
    decorateSummary(formTag, summarySection);
  }
}
