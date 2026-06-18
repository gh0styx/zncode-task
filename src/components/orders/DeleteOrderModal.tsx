'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { dictionary } from '@/lib/i18n';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cancelDeleteOrder, confirmDeleteOrder } from '@/store/inventorySlice';
import { selectPendingDeleteOrderId } from '@/store/store';

export function DeleteOrderModal() {
  const dispatch = useAppDispatch();
  const [confirmed, setConfirmed] = useState(false);
  const [validated, setValidated] = useState(false);
  const pendingId = useAppSelector(selectPendingDeleteOrderId);
  const order = useAppSelector((state) =>
    state.inventory.orders.find((item) => item.id === pendingId)
  );
  const product = useAppSelector((state) =>
    state.inventory.products.find((item) => item.order === pendingId)
  );

  useEffect(() => {
    if (pendingId !== null) {
      setConfirmed(false);
      setValidated(false);
    }
  }, [pendingId]);

  const close = () => dispatch(cancelDeleteOrder());

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);

    if (!confirmed) return;
    dispatch(confirmDeleteOrder());
  };

  return (
    <Modal
      show={pendingId !== null}
      centered
      onHide={close}
      className="delete-modal"
    >
      <Form noValidate validated={validated} onSubmit={submit}>
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
          <Form.Check
            id="delete-order-confirm"
            className="delete-modal__check"
            required
            checked={confirmed}
            isInvalid={validated && !confirmed}
            label="Подтвердить удаление прихода"
            feedback="Подтвердите удаление прихода"
            feedbackType="invalid"
            onChange={(event) => setConfirmed(event.currentTarget.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={close}>
            {dictionary.ru.cancel}
          </Button>
          <Button className="delete-modal__confirm" type="submit">
            🗑 {dictionary.ru.delete}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
