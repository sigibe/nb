import { getWidget, setActive, subscribe } from "../../libs/afb-interaction.js";
import { DefaultField } from "../defaultInput.js";
import * as builder from "../../libs/afb-builder.js";
import { Constants } from "../../libs/constants.js";

export class Range extends DefaultField {

    blockName = 'cmp-adaptiveform-textinput'
     
    addListener() {
        if(this.element) {
            let widget = getWidget(this.block);
            widget?.addEventListener('change', (e) => {
                this.model.value = e.target.value;
                let state = this.model?.getState();
                if(this.element)
                    setActive(this.element, false);

                let hover = this.element.querySelector(".hover");

                if(hover) {
                    hover.textContent = state?.displayFormat ? state?.displayFormat.replace("{}", e.target.value) : e.target.value;
                    this.setHoverStyle(hover, e.target.min, e.target.max, e.target.value, e.target.step);
                }
            });
            widget?.addEventListener('focus', (e) => {
                if(this.element)
                    setActive(this.element, true);
            });
        }
    }

    setHoverStyle(hover, min, max, value, step) {
        min = parseInt(min) || 0;
        max = parseInt(max) || 0;
        value = parseInt(value) || 0;
        step = parseInt(step) || 1;

        let totalSteps = Math.ceil((max - min)/step) + 1;
        let currStep = Math.ceil((value - min)/step);

        hover.style.left = `calc(${currStep}*(100%/${totalSteps}))`;
    }

    customize(state) {
        let input = this.element.querySelector("input");
        input.type = "range";
        input.step = state.step ? state.step : 1;

        let hoverWrapper = document.createElement("div");
        hoverWrapper.classList.add("hover-wrapper");

        let hover = document.createElement("span");
        hover.classList.add("hover");
        hover.textContent = state?.displayFormat ? state?.displayFormat.replace("{}", input.value) : input.value;
        this.setHoverStyle(hover, input.min, input.max, input.value, input.step);


        hoverWrapper.append(hover);

        this.element.insertBefore(hoverWrapper, input);

        let rangeWrapper = document.createElement("div");
        let minspan = document.createElement("span");
        let maxspan = document.createElement("span");

        minspan.textContent = state?.displayFormat ? state?.displayFormat.replace("{}", input.min) : input.min;
        minspan.classList.add("min-range");

        maxspan.textContent = state?.displayFormat ? state?.displayFormat.replace("{}", input.max) : input.max;
        maxspan.classList.add("max-range");

        rangeWrapper.classList.add("range-wrapper")
        rangeWrapper.append(minspan, maxspan);

        this.element.insertBefore(rangeWrapper, input.nextElementSibling);
    }

    render() {
        this.element = builder?.default?.renderField(this.model, this.blockName)
        this.customize(this.model?.getState());
        this.block.className = Constants.ADAPTIVE_FORM+"-"+this.model?.fieldType
        this.block.appendChild(this.element);
        this.addListener();
        subscribe(this.model, this.element);
    }
}
export default async function decorate(block, model) {
    let range = new Range(block, model);
    range.render();
}
