import { Injector, Type } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { Formio } from "formiojs";
import { FormioCustomComponentInfo } from "../formio.common";
import { createCustomFormioComponent } from "./create-custom-component";

export function registerCustomFormioComponent(
  options: FormioCustomComponentInfo,
  component: Type<any>,
  injector: Injector,
) {
  const complexCustomComponent = createCustomElement(component, { injector });
  customElements.define(options.selector, complexCustomComponent);

  Formio.Components.setComponent(options.type, createCustomFormioComponent(options));
}
