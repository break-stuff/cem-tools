type NativeEventProps = {
  // Clipboard Events
  onCopy?: (event: ClipboardEvent) => void;
  onCut?: (event: ClipboardEvent) => void;
  onPaste?: (event: ClipboardEvent) => void;

  // Composition Events
  onCompositionStart?: (event: CompositionEvent) => void;
  onCompositionUpdate?: (event: CompositionEvent) => void;
  onCompositionEnd?: (event: CompositionEvent) => void;

  // Keyboard Events
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;

  // Focus Events
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;

  // Form Events
  onChange?: (event: Event) => void;
  onInput?: (event: Event) => void;
  onSubmit?: (event: Event) => void;
  onReset?: (event: Event) => void;

  // Mouse Events
  onClick?: (event: MouseEvent) => void;
  onContextMenu?: (event: MouseEvent) => void;
  onDoubleClick?: (event: MouseEvent) => void;
  onDrag?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragExit?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  onDragStart?: (event: DragEvent) => void;
  onDrop?: (event: DragEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onMouseOut?: (event: MouseEvent) => void;
  onMouseOver?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;

  // Pointer Events
  onPointerDown?: (event: PointerEvent) => void;
  onPointerMove?: (event: PointerEvent) => void;
  onPointerUp?: (event: PointerEvent) => void;
  onPointerCancel?: (event: PointerEvent) => void;
  onPointerEnter?: (event: PointerEvent) => void;
  onPointerLeave?: (event: PointerEvent) => void;
  onPointerOver?: (event: PointerEvent) => void;
  onPointerOut?: (event: PointerEvent) => void;

  // UI Events
  onScroll?: (event: UIEvent) => void;

  // Wheel Events
  onWheel?: (event: WheelEvent) => void;

  // Animation Events
  onAnimationStart?: (event: AnimationEvent) => void;
  onAnimationEnd?: (event: AnimationEvent) => void;
  onAnimationIteration?: (event: AnimationEvent) => void;

  // Transition Events
  onTransitionEnd?: (event: TransitionEvent) => void;

  // Media Events
  onLoad?: (event: Event) => void;
  onError?: (event: Event) => void;

  // Image Events
  onLoadStart?: (event: Event) => void;
  onLoadEnd?: (event: Event) => void;

  // ... Add more events as needed
};
