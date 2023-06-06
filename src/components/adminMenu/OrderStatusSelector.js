import React, { useCallback, useState } from "react";
import {Alert, Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_ORDER_STATUS } from "../../operations/mutations/updateOrderStatus";
import ErrorsHandler from "../ErrorsHandler";

const orderStatusEnum = ["PROCESSING", "SHIPPING", "DONE", "CANCELLED"];

export default function OrderStatusSelector({ id, status }) {
  const [errors, setErrors] = useState(undefined);

  const [updateOrderStatus, {data}] = useMutation(UPDATE_ORDER_STATUS);

  const onSelectChange = useCallback((event) => {
    updateOrderStatus({
      variables: {
        id: id,
        orderStatus: event.target.value,
      },
      onCompleted: (data) => {
        if (!data.updateOrderStatus.status) {setErrors(data.updateOrderStatus.errors)}
      }
    });
  });

  return (
    <Box>
      {!data && (
        <FormControl>
          <InputLabel id="label">Изменить статус</InputLabel>
          <Select labelId="label" value={status} onChange={onSelectChange}>
            {orderStatusEnum.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {data && !errors && (
        <Alert severity={"success"}>Статус заказа изменен!</Alert>
      )}
      {errors && <ErrorsHandler errors={errors} />}
    </Box>
  );
}
