import { Store, Unsubscribe } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

/**
 * By using this `CustomElement` interface instead of `HTMLElement`, we avoid
 * having the generated typings include most DOM API already provided by
 * TypeScript. This is particularly useful since different versions of
 * TypeScript may have different DOM API typings (e.g. TS 3.0.3 and TS 3.1.1).
 * The required `isConnected` property is included to avoid the following
 * TypeScript error:
 *     Type 'HTMLElement' has no properties in common with type 'CustomElement'.
 */
interface CustomElement {
  readonly isConnected: boolean;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}

/**
 * This is a JavaScript mixin that you can use to connect a Custom Element base
 * class to a Redux store. The `stateChanged(state)` method will be called when
 * the state is updated.
 *
 * Example:
 *
 *    import { connect } from 'pwa-helpers/connect-mixin.js';
 *
 *    class MyElement extends connect(store)(HTMLElement) {
 *      stateChanged(state) {
 *        this.textContent = state.data.count.toString();
 *      }
 *    }
 */
export const connect = <S>(store: Store<S>) => <
  T extends Constructor<CustomElement>
>(
  baseElement: T,
) =>
  class extends baseElement {
    private _oldState: S = store.getState();
    private _storeUnsubscribe: Unsubscribe;

    public connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this._storeUnsubscribe = store.subscribe(() => {
        const newState = store.getState();
        this.stateChanged(newState, this._oldState);
        this._oldState = newState;
      });
      this.stateChanged(this._oldState);
    }

    public disconnectedCallback() {
      this._storeUnsubscribe();

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    /**
     * The `stateChanged(newState, oldState)` method will be called when the state is updated.
     */
    public stateChanged(newState: S, oldState?: S) {} // eslint-disable-line @typescript-eslint/no-unused-vars
  };
