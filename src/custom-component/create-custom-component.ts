import { Formio, Utils as FormioUtils, BuilderInfo } from "formiojs";
import { FormioCustomComponentInfo, FormioCustomElement } from "../formio.common";

const BaseComponent = Formio.Components.components.base;

export function createCustomFormioComponent(customComponentOptions: FormioCustomComponentInfo) {
  return class CustomComponent extends BaseComponent {
    static editForm = customComponentOptions.editForm || BaseComponent.editForm;
    public id = FormioUtils.getRandomComponentId();
    public type = customComponentOptions.type;
    public element: HTMLElement;
    _value: any;
    _customElement: FormioCustomElement;

    constructor(component: any, options: any, data: any) {
      super(component, options, data);
    }

    static schema() {
      return BaseComponent.schema({
        ...customComponentOptions.schema,
        type: customComponentOptions.type,
      });
    }

    get defaultSchema() {
      return CustomComponent.schema();
    }

    get emptyValue() {
      return '';
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

    elementInfo() {
      const info = super.elementInfo();
      info.type = 'input';
      info.changeEvent = 'click';

      return info;
    }

    build() {
      this.element = super.ce('div', { class: 'form-group formio-component ' + customComponentOptions.extraClasses });
      this.element.id = this.id;
      super.createLabel(this.element);
      const customElement = super.ce(customComponentOptions.selector) as FormioCustomElement;
      const _self = this;
      customElement.addEventListener('valueChange', function(event: CustomEvent) {
        console.log('valueChange', event.detail); // TODO: Remove
        _self._value = event.detail;
      });
      this._customElement = customElement;
      this.element.appendChild(customElement);
      (this.element as any).component = this;
    }

    getValue() {
      return this._value;
    }

    setValue(value: any) {
      console.log('setValue', value); // TODO: Remove
      this._value = value;
      this._customElement.setAttribute('value', value);
    }
  };
}
