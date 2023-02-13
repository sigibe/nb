import {
  loadBlock, buildBlock, decorateBlock, readBlockConfig, fetchPlaceholders,
} from '../../scripts/scripts.js';

function decorateCurrency(block) {
  block.querySelectorAll('input[type=currency]').forEach((item) => {
    const id = item.getAttribute('id');
    const currencyDiv = document.createElement('div');
    currencyDiv.innerHTML = `
    <span class='currency-symbol class='.currency-symbol'>R</span>
    <input id='${id}' class='currency' type='text'>
    `;
    item.parentNode.replaceChild(currencyDiv, item);
  });
}
function setBubble(range, bubble, termVals) {
  const val = range.value;
  bubble.innerHTML = termVals[parseInt(val, 10)];
}

function buildRepayCalcTab(config, placeholders) {
  const calc = document.createElement('div');
  calc.innerHTML = `
  <h4 id='repayment-calculator' role='tab'>${config['repayment-calculator-title']}</h4>
  <p>${config['repayment-calculator-description']}</p>
  <div class='calculator'>
    <div class="left-panel">
      <form>
        <label for='loan-amt'>${config['repayment-calculator-amount-field-label']}</label>
        <div>
          <input id='loan-amt' type='currency'/>
          <div class="field-desc text-muted">${config['repayment-calculator-amount-field-description']}</div>
        </div>
        <label for='repayment-term-range'>${config['repayment-calculator-term-field-label']}</label>
        <div class="range-wrap">
          <output id='repayment-term-val' class='bubble'></output>
          <input id='repayment-term-range' type="range" class="range" min="0" max="6">
          <div class='range-boundary-labels'>
            <div class='text-muted'>6 Months</div>
            <div class='text-muted'>6 Years</div>
          </div>
        </div>
        <p>${config['repayment-calculator-insurance-field-label']}</p>
        <input type="radio" name="personalInsurance" id="repayment-personal-insurance-yes">
        <label for="repayment-personal-insurance-yes">${config['repayment-calculator-insurance-field-option-1']}</label>
        <br>
        <input type="radio" name="personalInsurance" id="repayment-personal-insurance-no">
        <label for="repayment-personal-insurance-no">${config['repayment-calculator-insurance-field-option-2']}</label>
      </form>
    </div>
    <div class="right-panel">
      <div class="result-panel">
        <p>${placeholders.monthlypaybacklabel}</p>
        <p class="calulated-value green">R190.18</p>
        <p>${placeholders.totalpaybacklabel}</p>
        <p class="calulated-value">R4,564.32</p>
        <label for='repayment-rate-range'>${placeholders.interestratelabel}</label>
        <div class="range-wrap">
          <output id='repayment-rate-val' class='bubble'></output>
          <input id='repayment-rate-range' type="range" class="range" min="0" max="35">
          <div class='range-boundary-labels'>
            <div class='text-muted'>8.25%</div>
            <div class='text-muted'>25.75%</div>
          </div>
        </div>
        <p>${placeholders.repymentinfomsg}</p>
      </div>
      <div class="actions">
        <a href="#">${placeholders.seeloandetail}</a>
        <a class="button primary" href="#">${placeholders.startloanapplication}</a>
      </div>
    </div>
  </div>
  `;

  const termRange = calc.querySelector('#repayment-term-range');
  const termBubble = calc.querySelector('#repayment-term-val');
  const termVals = ['6 Months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years'];
  termRange.addEventListener('input', () => {
    setBubble(termRange, termBubble, termVals);
  });
  setBubble(termRange, termBubble, termVals);

  const rateRange = calc.querySelector('#repayment-rate-range');
  const rateBubble = calc.querySelector('#repayment-rate-val');
  const rateVal = [];
  for (let r = 0; r <= 35; r += 1) {
    rateVal.push(`${8.25 + 0.5 * r}%`);
  }
  rateRange.addEventListener('input', () => {
    setBubble(rateRange, rateBubble, rateVal);
  });
  setBubble(rateRange, rateBubble, rateVal);

  return calc;
}

function buildLoanCalcTab(config) {
  const calc = document.createElement('div');
  calc.innerHTML = `
      <h4 id='loan-consolidation-calculator' role='tab'>${config['loan-consolidation-calculator-title']}</h4>
      <p>${config['loan-consolidation-calculator-description']}</p>
      <div class='calculator'>
      <div class="left-panel">
        <form>
          <p>Loan 1 Details</p>
          <p>What type of loan is it?</p>
          <input type="text">
          <p>Amount you still owe</p>
          <div>
            <input type="currency">
            <div class="field-desc text-muted">Enter an amount between R2,000 and R300,000</div>
          </div>
          <p>What’s your preferred repayment term?</p>
          <div class="range-wrap">
            <output id='loan-term-val' class='bubble'></output>
            <input id='loan-term-range' type="range" class="range" min="0" max="6">
            <div class='range-boundary-labels'>
              <div class='text-muted'>6 Months</div>
              <div class='text-muted'>6 Years</div>
            </div>
          </div>
          <p>Include insurance in your repayment</p>
          <input type="radio" name="personalInsurance" id="loan-personal-insurance-yes">
          <label for="loan-personal-insurance-yes">Add R74.25 to the loan amount for insurance</label>
          <br>
          <input type="radio" name="personalInsurance" id="loan-personal-insurance-no">
          <label for="loan-personal-insurance-no">I have my own insurance</label>
        </form>
      </div>
      <div class="right-panel">
        <div class="result-panel">
          <p>Total Amount</p>
          <p class="calulated-value">R20000</p>
          <p>How much you’ll pay back each month</p>
          <p class="calulated-value">R4,564.32</p>

          <p>How much you’ll be saving</p>
          <p>A single, easy to manage instalment will mean you spend less each month on fees.</p>

          <p>Example interest rate</p>
          <p class="calulated-value">19.25%</p>
          <div class="range-wrap">
            <output id='loan-rate-val' class='bubble'></output>
            <input id='loan-rate-range' type="range" class="range" min="0" max="35">
            <div class='range-boundary-labels'>
              <div class='text-muted'>8.25%</div>
              <div class='text-muted'>25.75%</div>
            </div>
          </div>

        </div>
        <div class="actions">
          <a href="#">See loan detail</a>
          <a class="button primary" href="#">Get Started</a>
        </div>
      </div>
    </div>
  `;

  const termRange = calc.querySelector('#loan-term-range');
  const termBubble = calc.querySelector('#loan-term-val');
  const termVals = ['6 Months', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years'];
  termRange.addEventListener('input', () => {
    setBubble(termRange, termBubble, termVals);
  });
  setBubble(termRange, termBubble, termVals);

  const rateRange = calc.querySelector('#loan-rate-range');
  const rateBubble = calc.querySelector('#loan-rate-val');
  const rateVal = [];
  for (let r = 0; r <= 35; r += 1) {
    rateVal.push(`${8.25 + 0.5 * r}%`);
  }
  rateRange.addEventListener('input', () => {
    setBubble(rateRange, rateBubble, rateVal);
  });
  setBubble(rateRange, rateBubble, rateVal);

  return calc;
}

export default async function decorate(block) {
  const blockCfg = readBlockConfig(block);
  block.innerHTML = '';
  const placeholders = await fetchPlaceholders();
  const repayCalc = buildRepayCalcTab(blockCfg, placeholders);
  const loanCalc = buildLoanCalcTab(blockCfg, placeholders);
  const tabs = buildBlock('tabs', [[repayCalc], [loanCalc]]);
  tabs.classList.add('tabs');
  block.appendChild(tabs);
  decorateBlock(tabs);
  decorateCurrency(tabs);
  loadBlock(tabs);
  return tabs;
}
