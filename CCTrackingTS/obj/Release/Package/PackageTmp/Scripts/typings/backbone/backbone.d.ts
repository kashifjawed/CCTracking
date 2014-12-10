/// <reference path="../jquery/jquery.d.ts" />
// Type definitions for Backbone 1.0.0
// Project: http://backbonejs.org/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions by: Natan Vivo <https://github.com/nvivo/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped



declare module Backbone {

    interface AddOptions extends Silenceable {
        at: number;
    }

    interface HistoryOptions extends Silenceable {
        pushState?: Boolean;
        root?: string;
    }

    interface NavigateOptions {
        trigger: Boolean;
    }

    interface RouterOptions {
        routes: any;
    }

    interface Silenceable {
        silent?: Boolean;
    }

    interface Validable {
        validate?: Boolean;
    }

    interface Waitable {
        wait?: Boolean;
    }

    interface Parseable {
        parse?: any;
    }

    interface PersistenceOptions {
        url?: string;
        beforeSend?: (jqxhr: JQueryXHR) => void;
        success?: (modelOrCollection?: any, response?: any, options?: any) => void;
        error?: (modelOrCollection?: any, jqxhr?: JQueryXHR, options?: any) => void;
    }

    interface ModelSetOptions extends Silenceable, Validable {
    }

    interface ModelFetchOptions extends PersistenceOptions, ModelSetOptions, Parseable {
    }

    interface ModelSaveOptions extends Silenceable, Waitable, Validable, Parseable, PersistenceOptions {
        patch?: Boolean;
    }

    interface ModelDestroyOptions extends Waitable, PersistenceOptions {
    }

    interface CollectionFetchOptions extends PersistenceOptions, Parseable {
        reset?: Boolean;
    }

    class Events {
        on(eventName: any, callback: (...args: any[]) => void, context?: any): any;
        on(eventName: any, callback: (args: any) => void, context?: any): any;
        off(eventName?: string, callback?: (...args: any[]) => void, context?: any): any;
        trigger(eventName: string, ...args: any[]): any;
        bind(eventName: string, callback: (...args: any[]) => void, context?: any): any;
        unbind(eventName?: string, callback?: (...args: any[]) => void, context?: any): any;

        once(events: string, callback: (...args: any[]) => void, context?: any): any;
        listenTo(object: any, events: string, callback: any): any;
        listenToOnce(object: any, events: string, callback: (...args: any[]) => void): any;
        stopListening(object?: any, events?: string, callback?: (...args: any[]) => void): any;
    }

    class ModelBase extends Events {
        url: any;
        parse(response, options?: any);
        toJSON(options?: any): any;
        sync(...arg: any[]): JQueryXHR;
    }

    interface OptionalDefaults {
        defaults? (): any;
    }

    class Model extends ModelBase implements OptionalDefaults {

        static extend(properties: any, classProperties?: any): any; // do not use, prefer TypeScript's extend functionality

        attributes: any;
        changed: any[];
        cid: string;
        id: any;
        idAttribute: string;
        validationError: any;
        urlRoot: any;

        constructor(attributes?: any, options?: any);
        initialize(attributes?: any);

        fetch(options?: ModelFetchOptions): JQueryXHR;

        get(attributeName: string): any;
        set(attributeName: string, value: any, options?: ModelSetOptions);
        set(obj: any, options?: ModelSetOptions);

        change();
        changedAttributes(attributes?: any): any[];
        clear(options?: Silenceable);
        clone(): Model;
        collection: Collection;
        destroy(options?: ModelDestroyOptions);
        escape(attribute: string);
        has(attribute: string): Boolean;
        hasChanged(attribute?: string): Boolean;
        isNew(): Boolean;
        isValid(): Boolean;
        previous(attribute: string): any;
        previousAttributes(): any[];
        save(attributes?: any, options?: ModelSaveOptions);
        unset(attribute: string, options?: Silenceable);
        validate(attributes: any, options?: any): any;

        _validate(attrs: any, options: any): Boolean;

        // mixins from underscore

        keys(): string[];
        values(): any[];
        pairs(): any[];
        invert(): any;
        pick(keys: string[]): any;
        pick(...keys: string[]): any;
        omit(keys: string[]): any;
        omit(...keys: string[]): any;
    }

    class SubRoute extends Router {

    }
    class Collection extends ModelBase {

        static extend(properties: any, classProperties?: any): any; // do not use, prefer TypeScript's extend functionality

        model: any;
        models: Model[];
        collection: Model;
        length: number;

        constructor(models?: any, options?: any);

        fetch(options?: CollectionFetchOptions): JQueryXHR;

        comparator: string;
        //comparator(element: Model): any;
        //comparator(compare: Model, to?: Model): any;

        add(model: Model, options?: AddOptions);
        add(models: Model[], options?: AddOptions);
        at(index: number): Model;
        get(id: any): Model;
        create(attributes: any, options?: ModelSaveOptions): Model;
        pluck(attribute: string): any[];
        push(model: Model, options?: AddOptions);
        pop(options?: Silenceable);
        remove(model: Model, options?: Silenceable);
        remove(models: Model[], options?: Silenceable);
        reset(models?: any, options?: Silenceable);
        save();
        shift(options?: Silenceable);
        sort(options?: Silenceable);
        unshift(model: Model, options?: AddOptions);
        where(properies: any): Model[];
        findWhere(properies: any): Model;

        _prepareModel(attrs?: any, options?: any): any;
        _removeReference(model: Model): void;
        _onModelEvent(event: string, model: Model, collection: Collection, options: any): void;

        // mixins from underscore

        all(iterator: (element: Model, index: number) => Boolean, context?: any): Boolean;
        any(iterator: (element: Model, index: number) => Boolean, context?: any): Boolean;
        collect(iterator: (element: Model, index: number, context?: any) => any[], context?: any): any[];
        chain(): any;
        compact(): Model[];
        contains(value: any): Boolean;
        countBy(iterator: (element: Model, index: number) => any): any[];
        countBy(attribute: string): any[];
        detect(iterator: (item: any) => Boolean, context?: any): any; // ???
        difference(...model: Model[]): Model[];
        drop(): Model;
        drop(n: number): Model[];
        each(iterator: (element: Model, index: number, list?: any) => void, context?: any);
        every(iterator: (element: Model, index: number) => Boolean, context?: any): Boolean;
        filter(iterator: (element: Model, index: number) => Boolean, context?: any): Model[];
        find(iterator: (element: Model, index: number) => Boolean, context?: any): Model;
        first(): Model;
        first(n: number): Model[];
        flatten(shallow?: Boolean): Model[];
        foldl(iterator: (memo: any, element: Model, index: number) => any, initialMemo: any, context?: any): any;
        forEach(iterator: (element: Model, index: number, list?: any) => void, context?: any);
        include(value: any): Boolean;
        indexOf(element: Model, isSorted?: Boolean): number;
        initial(): Model;
        initial(n: number): Model[];
        inject(iterator: (memo: any, element: Model, index: number) => any, initialMemo: any, context?: any): any;
        intersection(...model: Model[]): Model[];
        isEmpty(object: any): Boolean;
        invoke(methodName: string, arguments?: any[]);
        last(): Model;
        last(n: number): Model[];
        lastIndexOf(element: Model, fromIndex?: number): number;
        map(iterator: (element: Model, index: number, context?: any) => any[], context?: any): any[];
        max(iterator?: (element: Model, index: number) => any, context?: any): Model;
        min(iterator?: (element: Model, index: number) => any, context?: any): Model;
        object(...values: any[]): any[];
        reduce(iterator: (memo: any, element: Model, index: number) => any, initialMemo: any, context?: any): any;
        select(iterator: any, context?: any): any[];
        size(): number;
        shuffle(): any[];
        some(iterator: (element: Model, index: number) => Boolean, context?: any): Boolean;
        sortBy(iterator: (element: Model, index: number) => number, context?: any): Model[];
        sortBy(attribute: string, context?: any): Model[];
        sortedIndex(element: Model, iterator?: (element: Model, index: number) => number): number;
        range(stop: number, step?: number);
        range(start: number, stop: number, step?: number);
        reduceRight(iterator: (memo: any, element: Model, index: number) => any, initialMemo: any, context?: any): any[];
        reject(iterator: (element: Model, index: number) => Boolean, context?: any): Model[];
        rest(): Model;
        rest(n: number): Model[];
        tail(): Model;
        tail(n: number): Model[];
        toArray(): any[];
        union(...model: Model[]): Model[];
        uniq(isSorted?: Boolean, iterator?: (element: Model, index: number) => Boolean): Model[];
        without(...values: any[]): Model[];
        zip(...model: Model[]): Model[];
    }

    interface OptionalRoutes {
        routes? (): any;
    }

    class Router extends Events implements OptionalRoutes {

        static extend(properties: any, classProperties?: any): any; // do not use, prefer TypeScript's extend functionality

        constructor(options?: RouterOptions);
        initialize(options?: RouterOptions);
        route(route: string, name: string, callback?: (...parameter: any[]) => void);
        navigate(fragment: string, options?: NavigateOptions);
        navigate(fragment: string, trigger?: Boolean);

        _bindRoutes(): void;
        _routeToRegExp(route: string): RegExp;
        _extractParameters(route: RegExp, fragment: string): string[];
    }

    var history: History;

    class History extends Events {

        handlers: any[];
        interval: number;

        start(options?: HistoryOptions);

        getHash(window?: Window): string;
        getFragment(fragment?: string, forcePushState?: Boolean): string;
        stop(): void;
        route(route: string, callback: (...args: any[]) => void);
        checkUrl(e?: any): void;
        loadUrl(fragmentOverride: string): Boolean;
        navigate(fragment: string, options?: any);
        started: Boolean;

        _updateHash(location: Location, fragment: string, replace: Boolean);
    }

    interface ViewOptions {
        model?: Backbone.Model;
        collection?: Backbone.Collection;
        el?: any;
        id?: string;
        className?: string;
        tagName?: string;
        attributes?: any[];
    }

    interface OptionalEvents {
        events? (): any;
    }

    class View extends Events implements OptionalEvents {

        static extend(properties: any, classProperties?: any): any;  // do not use, prefer TypeScript's extend functionality

        constructor(options?: ViewOptions);

        $(selector: string): JQuery;
        model: Model;
        collection: Collection;
        make(tagName: string, attrs?, opts?): View;
        setElement(element: HTMLElement, delegate?: Boolean);
        setElement(element: JQuery, delegate?: Boolean);
        id: string;
        cid: string;
        className: string;
        tagName: string;
        options: any;

        el: any;
        $el: JQuery;
        setElement(element);
        attributes;
        $(selector): JQuery;
        render(): View;
        remove(): View;
        make(tagName, attributes?, content?);
        delegateEvents(events?: any): any;
        undelegateEvents();

        _ensureElement(): void;
    }

    // SYNC
    function sync(method, model, options?: JQueryAjaxSettings);
    var emulateHTTP: Boolean;
    var emulateJSONBackbone: Boolean;

    // Utility

    // 0.9 cannot return modules anymore, and "typeof <Module>" is not compiling for some reason
    // returning "any" until this is fixed

    //function noConflict(): typeof Backbone;
    function noConflict(): any;

    function setDomLibrary(jQueryNew);

}

