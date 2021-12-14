
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';

import { library } from '@fortawesome/fontawesome-svg-core';

export const loadIcons = () => {
  library.add(
    faPencilAlt,
    faTrash,
    faSort,
  );
};
