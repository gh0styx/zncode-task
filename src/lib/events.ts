type InventoryEventMap = {
  'order:selected': { orderId: number };
  'order:delete-requested': { orderId: number };
  'product:filtered': { type: string };
};

type Handler<T> = (payload: T) => void;

class EventBus {
  private handlers = new Map<keyof InventoryEventMap, Set<Handler<InventoryEventMap[keyof InventoryEventMap]>>>();

  emit<K extends keyof InventoryEventMap>(event: K, payload: InventoryEventMap[K]) {
    this.handlers.get(event)?.forEach((handler) => handler(payload));
  }

  on<K extends keyof InventoryEventMap>(event: K, handler: Handler<InventoryEventMap[K]>) {
    const handlers = this.handlers.get(event) ?? new Set();
    handlers.add(handler as Handler<InventoryEventMap[keyof InventoryEventMap]>);
    this.handlers.set(event, handlers);
    return () => handlers.delete(handler as Handler<InventoryEventMap[keyof InventoryEventMap]>);
  }
}

export const inventoryEvents = new EventBus();
