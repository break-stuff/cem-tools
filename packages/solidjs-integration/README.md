# Custom Elements SolidJS Integration

### Native Events Template

```ts
// Mouse Events

/** Triggered when the element is clicked by the user by mouse or keyboard. */
onClick?: (event: MouseEvent) => void;
/** Fired when the context menu is triggered, often by right-clicking. */
onContextMenu?: (event: MouseEvent) => void;
/** Fired when the element is double-clicked. */
onDoubleClick?: (event: MouseEvent) => void;
/** Fired repeatedly as the draggable element is being dragged. */
onDrag?: (event: DragEvent) => void;
/** Fired when the dragging of a draggable element is finished. */
onDragEnd?: (event: DragEvent) => void;
/** Fired when a dragged element or text selection enters a valid drop target. */
onDragEnter?: (event: DragEvent) => void;
/** Fired when a dragged element or text selection leaves a valid drop target. */
onDragExit?: (event: DragEvent) => void;
/** Fired when a dragged element or text selection leaves a valid drop target. */
onDragLeave?: (event: DragEvent) => void;
/** Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds). */
onDragOver?: (event: DragEvent) => void;
/** Fired when a draggable element starts being dragged. */
onDragStart?: (event: DragEvent) => void;
/** Fired when a dragged element is dropped onto a drop target. */
onDrop?: (event: DragEvent) => void;
/** Fired when a mouse button is pressed down on the element. */
onMouseDown?: (event: MouseEvent) => void;
/** Fired when the mouse cursor enters the element. */
onMouseEnter?: (event: MouseEvent) => void;
/** Triggered when the mouse cursor leaves the element. */
onMouseLeave?: (event: MouseEvent) => void;
/** Fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it. */
onMouseMove?: (event: MouseEvent) => void;
/** Fired at an Element when a pointing device (usually a mouse) is used to move the cursor so that it is no longer contained within the element or one of its children. */
onMouseOut?: (event: MouseEvent) => void;
/** Fired at an Element when a pointing device (such as a mouse or trackpad) is used to move the cursor onto the element or one of its child elements. */
onMouseOver?: (event: MouseEvent) => void;
/** Fired when a mouse button is released on the element. */
onMouseUp?: (event: MouseEvent) => void;

// Keyboard Events

/** Fired when a key is pressed down. */
onKeyDown?: (event: KeyboardEvent) => void;
/** Fired when a key is released.. */
onKeyUp?: (event: KeyboardEvent) => void;
/** Fired when a key is pressed down. */
onKeyPressed?: (event: KeyboardEvent) => void;

// Focus Events

/** Fired when the element receives focus, often triggered by tab navigation. */
onFocus?: (event: FocusEvent) => void;
/** Fired when the element loses focus. */
onBlur?: (event: FocusEvent) => void;

// Form Events

/** Fired when the value of an input element changes, such as with text inputs or select elements. */
onChange?: (event: Event) => void;
/** Fires when the value of an <input>, <select>, or <textarea> element has been changed. */
onInput?: (event: Event) => void;
/** Fired when a form is submitted, usually on pressing Enter in a text input. */
onSubmit?: (event: Event) => void;
/** Fired when a form is reset. */
onReset?: (event: Event) => void;

// UI Events

/** Fired when the content of an element is scrolled. */
onScroll?: (event: UIEvent) => void;

// Wheel Events

/** Fired when the mouse wheel is scrolled while the element is focused. */
onWheel?: (event: WheelEvent) => void;

// Animation Events

/** Fired when a CSS animation starts. */
onAnimationStart?: (event: AnimationEvent) => void;
/** Fired when a CSS animation completes. */
onAnimationEnd?: (event: AnimationEvent) => void;
/** Fired when a CSS animation completes one iteration. */
onAnimationIteration?: (event: AnimationEvent) => void;

// Transition Events

/** Fired when a CSS transition has completed. */
onTransitionEnd?: (event: TransitionEvent) => void;

// Media Events

/** Fired when an element (usually an image) finishes loading */
onLoad?: (event: Event) => void;
/** Fired when an error occurs during the loading of an element, like an image not being found. */
onError?: (event: Event) => void;

// Clipboard Events

/** Fires when the user initiates a copy action through the browser's user interface. */
onCopy?: (event: ClipboardEvent) => void;
/** Fired when the user has initiated a "cut" action through the browser's user interface. */
onCut?: (event: ClipboardEvent) => void;
/** Fired when the user has initiated a "paste" action through the browser's user interface. */
onPaste?: (event: ClipboardEvent) => void;

// ... Add more events as needed
```
