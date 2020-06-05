import { BuilderInfo, Components, ExtendedComponentSchema, Utils as FormioUtils } from 'formiojs';
import { FormioCustomComponentInfo, FormioCustomElement, FormioEvent } from '../elements.common';
import { clone, isNil, isArray } from 'lodash';

const BaseInputComponent = Components.components.input;
const TextfieldComponent = Components.components.textfield;

export function createCustomFormioComponent(customComponentOptions: FormioCustomComponentInfo) {
  return class CustomComponent extends BaseInputComponent {
    static editForm = customComponentOptions.editForm || TextfieldComponent.editForm;
    id = FormioUtils.getRandomComponentId();
    type = customComponentOptions.type;
    _customAngularElement: FormioCustomElement;

    static schema() {
      return BaseInputComponent.schema({
        ...customComponentOptions.schema,
        type: customComponentOptions.type,
      });
    }

    get defaultSchema() {
      return CustomComponent.schema();
    }

    get emptyValue() {
      return customComponentOptions.emptyValue || null;
    }

    static get builderInfo(): BuilderInfo {
      return {
        title: customComponentOptions.title,
        group: customComponentOptions.group,
        icon: customComponentOptions.icon,
        weight: customComponentOptions.weight,
        documentation: customComponentOptions.documentation,
        schema: CustomComponent.schema(),
      };
    }

    constructor(public component: ExtendedComponentSchema, options: any, data: any) {
      super(component, {
        ...options,
        sanitizeConfig: {
          addTags: [customComponentOptions.selector],
        },
      }, data);

      if (customComponentOptions.extraValidators) {
        this.validators = this.validators.concat(customComponentOptions.extraValidators);
      }
    }

    elementInfo() {
      const info = super.elementInfo();
      info.type = customComponentOptions.selector;
      info.changeEvent = customComponentOptions.changeEvent || 'valueChange';
      info.attr = {
        ...info.attr,
        class: info.attr.class.replace('form-control', 'form-control-custom-field') // remove the form-control class as the custom angular component may look different
      };
      return info;
    }

    get inputInfo() {
      const info = {
        id: this.key,
        ...this.elementInfo()
      }
      return info;
    }

    renderElement(value: any, index: number) {
      const info = this.inputInfo;
      return this.renderTemplate(customComponentOptions.template || 'input', {
        input: info,
        value,
        index
      });
    }

    attach(element: HTMLElement) {
      let superAttach = super.attach(element);

      this._customAngularElement = element.querySelector(customComponentOptions.selector);

      // Bind the custom options and the validations to the Angular component's inputs (flattened)
      if (this._customAngularElement) {
        // To make sure we have working input in IE...
        // IE doesn't render it properly if it's not visible on the screen
        // due to the whole structure applied via innerHTML to the parent
        // so we need to use appendChild
        if (!this._customAngularElement.getAttribute('ng-version')) {
          this._customAngularElement.removeAttribute('ref');

          const newCustomElement = document.createElement(customComponentOptions.selector) as FormioCustomElement;

          newCustomElement.setAttribute('ref', 'input');
          Object.keys(this.inputInfo.attr).forEach((attr: string) => {
            newCustomElement.setAttribute(attr, this.inputInfo.attr[attr]);
          });

          this._customAngularElement.appendChild(newCustomElement);
          this._customAngularElement = newCustomElement;

          superAttach = super.attach(element);
        }

        // Bind customOptions
        for (const key in this.component.customOptions) {
          if (this.component.customOptions.hasOwnProperty(key)) {
            this._customAngularElement[key] = this.component.customOptions[key];
          }
        }
        // Bind validate options
        for (const key in this.component.validate) {
          if (this.component.validate.hasOwnProperty(key)) {
            this._customAngularElement[key] = this.component.validate[key];
          }
        }
        // Bind options explicitly set
        const fieldOptions = customComponentOptions.fieldOptions;
        if (isArray(fieldOptions) && fieldOptions.length > 0) {
          for (const key in fieldOptions) {
            if (fieldOptions.hasOwnProperty(key)) {
              this._customAngularElement[fieldOptions[key]] = this.component[fieldOptions[key]];
            }
          }
        }

        // Attach event listener for emit event
        this._customAngularElement.addEventListener('formioEvent', (event: CustomEvent<FormioEvent>) => {
          this.emit(event.detail.eventName, {
            ...event.detail.data,
            component: this.component
          });
        });

        // Ensure we bind the value (if it isn't a multiple-value component with no wrapper)
        if (!this._customAngularElement.value && !this.component.disableMultiValueWrapper) {
          this.restoreValue();
        }

      }
      return superAttach;
    }

    // Add extra option to support multiple value (e.g. datagrid) with single angular component (disableMultiValueWrapper)
    useWrapper() {
      return this.component.hasOwnProperty('multiple') && this.component.multiple && !this.component.disableMultiValueWrapper;
    }

    get defaultValue() {
      let defaultValue = this.emptyValue;

      // handle falsy default value
      if (!isNil(this.component.defaultValue)) {
        defaultValue = this.component.defaultValue;
      }

      if (this.component.customDefaultValue && !this.options.preview) {
        defaultValue = this.evaluate(
          this.component.customDefaultValue,
          { value: '' },
          'value'
        );
      }

      return clone(defaultValue);
    }
  };
}
