declare module "@mapbox/mapbox-gl-language" {
  export default class MapboxLanguage implements IControl {
    constructor(options?: {
      defaultLanguage: string;
      supportedLanguages: string[];
      //...etc
    });
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
    getDefaultPosition?: (() => string) | undefined;
  }
}