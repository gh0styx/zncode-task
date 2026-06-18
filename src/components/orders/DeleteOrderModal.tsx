'use client';

import { Button, Modal } from 'react-bootstrap';
import { dictionary } from '@/lib/i18n';
import { cancelDeleteOrder, confirmDeleteOrder } from '@/store/inventorySlice';
import { selectPendingDeleteOrderId } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function DeleteOrderModal() {
  const dispatch = useAppDispatch();
  const pendingId = useAppSelector(selectPendingDeleteOrderId);
  const order = useAppSelector((state) => state.inventory.orders.find((item) => item.id === pendingId));
  const product = useAppSelector((state) => state.inventory.products.find((item) => item.order === pendingId));

  return (
    <Modal show={pendingId !== null} centered onHide={() => dispatch(cancelDeleteOrder())} className="delete-modal">
      <Modal.Header closeButton>
        <Modal.Title>{dictionary.ru.deleteOrderQuestion}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-modal__product">
          <span className="status-dot status-dot--green" />
          {product && <img src={product.photo} alt="" />}
          <div>
            <strong>{product?.title ?? order?.title}</strong>
            <small>{product?.serialNumber}</small>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={() => dispatch(cancelDeleteOrder())}>{dictionary.ru.cancel}</Button>
        <Button className="delete-modal__confirm" onClick={() => dispatch(confirmDeleteOrder())}>🗑 {dictionary.ru.delete}</Button>
      </Modal.Footer>
    </Modal>
  );
}
