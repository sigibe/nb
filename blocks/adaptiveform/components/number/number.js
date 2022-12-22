import * as builder from "../../libs/afb-builder.js";
import { getWidget, subscribe, updateValue } from "../../libs/afb-interaction.js";
import { DefaultField } from "../defaultInput.js";
import NumericInputWidget from "./NumberInputWidget.js";

export class NumberInput extends DefaultField {

    blockName = 'cmp-adaptiveform-numberinput';

    widgetFormatter;

    _updateValue = (element ,value) =>{
        let widget = getWidget(element);
        if (this.widgetFormatter == null && (this.model.editFormat || this.model.displayFormat)) {
            this.widgetFormatter = new NumericInputWidget(widget, this.model)
        }
        if (this.widgetFormatter) {
            this.widgetFormatter.setValue(value);
        } else {
            updateValue(element, value);
        }
    }

    // @todo customize using better way
    customize() {
        let state = this.model?.getState();

        if(state && state.displayFormat) {
            let widget = getWidget(this.element);
            let div = document.createElement("div");
            let span = document.createElement("span");
            span.classList.add("number-format");
            span.textContent = state.displayFormat.replace("{}", "");

            div.append(span);

            this.element.insertBefore(div, widget);
            div.append(widget);
        }
    }

    render() {
        this.element = builder?.default?.renderField(this.model, this.blockName);
        this.customize();
        this.block.appendChild(this.element);
        this.addListener();
        subscribe(this.model, this.element, {value : this._updateValue});
    }
}

export default async function decorate(block, model) {
    let textinput = new NumberInput(block, model);
    textinput.render();
}
