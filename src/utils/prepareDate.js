// 1993-10-01 to 01.10.1993
export const prepareBackendDate = (originalDate) => {
  if (!originalDate) {
    return '';
  }

  const date = new Date(originalDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year}`;
};

// 2020-08-21T23:15:30.000Z to 21.08.2020
export const prepareDatePickerDate = (originalDate) => {
  if (!originalDate) {
    return '';
  }

  const dateObject = new Date(originalDate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // +1, так как месяцы в JavaScript начинаются с 0
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// 2020-08-22 to 2020-08-21T23:15:30.000Z
export const prepareEditDate = (date) => {
  const dateComponents = date.split('-');

  return new Date(
    parseInt(dateComponents[0], 10),
    parseInt(dateComponents[1], 10) - 1,
    parseInt(dateComponents[2], 10)
  );
};
