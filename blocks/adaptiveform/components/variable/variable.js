new class {
    constructor() {
        this.overrideTextContent();
    }

    getTextContent(value) {
        let variables = VariableWrapper.getVariables();
        return new Function(...Object.keys(variables), `return \`${value}\`;`)(...Object.values(variables));
    }

    overrideTextContent() {
        let descriptor = Object.getOwnPropertyDescriptor(Node.prototype, "textContent");
        let self = this;

        Object.defineProperty(Node.prototype, "textContent", {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            get: descriptor.get,
            set: function(value) {
                if(value) {
                    let val;
                    try {
                        val = self.getTextContent(value);
                    } catch (err) {
                        console.error(err);
                        val = value;
                    }

                    if (val != value) {
                        this.innerHTML = val;
                        return;
                    }
                }
                descriptor.set.call(this, value);
            }
        });
    }
}

class VariableWrapper {
    static #variables = {};
    static #proxy = new Proxy(VariableWrapper.#variables, {
        get(target, prop, receiver) {
            let variable = target[prop];
            if (variable) {
                return variable.html;
            }
            return "<div></div>";
        }
    });

    static getVariables() {
        return VariableWrapper.#proxy;
    }

    static add(model) {
        let state = model?.getState();
        if(state && state.name) {
            VariableWrapper.#variables[state.name] = new Variable(state);   
        }
    }
}

class Variable {
    #state;
    #element;

    constructor(state) {
        this.#state = state;
        this.#element = this.#getElement();
    }

    get html() {
        return this.#element.outerHTML;
    }

    #getElement() {
        if(this.#state.type === 'link') {
            let a = document.createElement('a');
            a.href = this.#state.value;
            a.textContent = this.#state?.label?.value || this.#state?.displayValue;
            return a;
        }
        return document.createElement('div');
    }
}

export default async function decorate(block, model) {
    VariableWrapper.add(model);
    block.hidden = true;
}
