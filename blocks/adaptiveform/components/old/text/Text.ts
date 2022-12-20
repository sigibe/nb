import FormFieldBase from "../../models/FormFieldBase";
import { Constants } from "../../util/constants";

export default class Text extends FormFieldBase {

    static NS = Constants.NS;
    static IS = "adaptiveFormText";
    static bemBlock = 'cmp-adaptiveform-text';

    static selectors  = {
        self: "[data-" + this.NS + '-is="' + this.IS + '"]'
    };

    getWidget() {
        return null;
    }

    getDescription() {
        return null;
    }

    getLabel() {
        return null;
    }

    getErrorDiv() {
        return null;
    }

    getTooltipDiv() {
        return null;
    }

    getQuestionMarkDiv() {
        return null;
    }

    getClass() {
        return Text.IS;
    }

    setFocus() {
        this.setActive();
    }
    getbemBlock(): string {
        return Text.bemBlock;
    }
    
    getIS() : string {
        return Text.IS;
    }

    createView(): Element {
        let div = document.createElement("div");
        div.id = this.getId();
        div.className = this.getbemBlock();
        div.dataset.cmpVisible = this.isVisible().toString();
        div.dataset.cmpAdaptiveformcontainerPath = this.getFormContainerPath();
        div.dataset.cmIs = this.getIS();

        let child = document.createElement("div");
        child.className = this.getbemBlock() + "__widget";
        child.tabIndex = 0;
        child.textContent = this.state.value;
        div.append(child);
        return div;
    };
}